import { CommandInteraction } from 'discord.js';
import { Command } from '../interfaces/command';

export const command: Command = {
	name: 'ping',
	description: 'bot ping',

	async execute(client, interaction: CommandInteraction) {
		try {
			await interaction.reply('pong');
		} catch (error) {
			console.error(error);
		}
	}
};
