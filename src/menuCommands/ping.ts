import { ApplicationCommandType, CommandInteraction, ContextMenuCommandBuilder } from 'discord.js';
import { Command } from '../interfaces/command';

export const command: Command = {
	name: 'menuping',
	description: 'bot ping',
	menuCommandData: new ContextMenuCommandBuilder().setName('ping').setType(ApplicationCommandType.User),

	async execute(client, interaction: CommandInteraction) {
		try {
			console.log(client.application?.commands);
		} catch (error) {
			console.error(error);
		}
	}
};
