import { Client, Collection, ClientOptions, GatewayIntentBits } from 'discord.js';
import { serverSettings } from '../interfaces/serverSettings';
import loadSlashCommands from '../utils/loadSlashCommands';
import { Command } from '../interfaces/command';
import { Event } from '../interfaces/event';
import path from 'path';
import fs from 'fs';

let filesExtension = '.js';
if (process.env.NODE_ENV !== 'production') filesExtension = '.ts';

class BotClient extends Client {
	public commands: Collection<string, Command> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public serverSettings: Collection<string, serverSettings> = new Collection();
	public cooldowns: Collection<string, number> = new Collection();

	constructor(options: ClientOptions) {
		super(options);
	}

	// prettier-ignore
	public async init(): Promise<void> {
		// load commands
		const commandsPath = path.join(__dirname, '..', 'commands');
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(filesExtension));
		const arrayCommands = []

		for (const file of commandFiles) {
			const { command } = await import(`${commandsPath}/${file}`);
			if (!command) continue;

			if (process.env.NODE_ENV !== 'production') console.log(`Loading: ${file} as ${command.name}`);
			arrayCommands.push(command);
			this.commands.set(command.name, command);
		}

		loadSlashCommands(arrayCommands);

		// load events
		const eventsPath = path.join(__dirname, '..', 'events');
		const eventsFiles = fs
			.readdirSync(eventsPath)
			.filter((file) => file.endsWith(filesExtension));
		for (const file of eventsFiles) {
			const { event } = await import(`${eventsPath}/${file}`);
			if (!event) continue;
			this.events.set(event.name, event);
			this.on(event.name, event.execute.bind(null, this));
		}
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
