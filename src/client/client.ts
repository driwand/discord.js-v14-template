import { Client, Collection, ClientOptions, GatewayIntentBits } from 'discord.js';
import loadSlashCommands from '../utils/loadSlashCommands';
import { Command } from '../interfaces/command';
import { Event } from '../interfaces/event';
import path from 'path';
import fs from 'fs';
import { Setting } from '../entities/Setting';

let filesExtension = '.js';
if (process.env.NODE_ENV !== 'production') filesExtension = '.ts';

class BotClient extends Client {
	public commands: Collection<string, Command> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public serverSettings: Collection<string, Setting> = new Collection();
	public cooldowns: Collection<string, number> = new Collection();

	constructor(options: ClientOptions) {
		super(options);
	}

	public async init(): Promise<void> {
		// load commands
		const arrayCommands: Command[] = [];

		arrayCommands.push(...((await this.readCommands('commands')) as Command[]));
		arrayCommands.push(...((await this.readCommands('menuCommands')) as Command[]));

		loadSlashCommands(arrayCommands);

		// load events
		const eventsPath = path.join(__dirname, '..', 'events');
		const eventsFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(filesExtension));
		for (const file of eventsFiles) {
			const { event } = await import(`${eventsPath}/${file}`);
			if (!event) continue;
			this.events.set(event.name, event);
			this.on(event.name, event.execute.bind(null, this));
		}
	}

	async readCommands(folderName: string) {
		const arrayCommands = [];
		const commandsPath = path.join(__dirname, '..', folderName);
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(filesExtension));
		for (const file of commandFiles) {
			const commandFile = await import(`${commandsPath}/${file}`);
			if (!commandFile) continue;
			const command = commandFile.command as Command;
			if (command.menuCommandData) {
				arrayCommands.push(command.menuCommandData.toJSON());
			} else {
				arrayCommands.push(command);
			}
			if (process.env.NODE_ENV !== 'production') {
				console.log(`Loading: ${file} as ${command.name}`);
			}
			this.commands.set(command.name, command);
		}
		return arrayCommands;
	}
}

const client = new BotClient({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMembers
	]
});

export default client;

export type BClient = BotClient;
