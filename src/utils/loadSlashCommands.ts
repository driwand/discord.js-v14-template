import { Command } from '../interfaces/command';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { botToken, clientId } from '../config/config';

const rest = new REST({ version: '10' }).setToken(botToken);

export default async (commands: Command[]) => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(clientId), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
};
