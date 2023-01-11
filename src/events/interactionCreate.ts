import { CommandInteraction, GuildMember } from 'discord.js';
import buttons from '../handlers/buttons';
import modalSubmit from '../handlers/modalSubmit';
import { Event } from '../interfaces/event';
import { isAdmin } from '../utils/utils';

export const event: Event = {
	name: 'interactionCreate',
	execute: async (client, interaction: CommandInteraction) => {
		try {
			if (interaction.isModalSubmit()) return modalSubmit(client, interaction);
			if (interaction.isButton()) return buttons(client, interaction);

			const cmd = client.commands.get(interaction.commandName);
			if (!cmd || !interaction.guild) return;

			if (cmd.serverOwnerOnly && interaction.user.id !== interaction.guild.ownerId) return;

			if (cmd.category === 'admin' && interaction.member) {
				if (!isAdmin(client, interaction.member as GuildMember, interaction.guild.id)) return;
			}

			await cmd.execute(client, interaction);
		} catch (error) {
			interaction.reply('there was an error trying to execute that command.').catch();
			console.error(error);
		}
	}
};
