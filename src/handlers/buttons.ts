import { ButtonInteraction } from 'discord.js';
import { BClient } from '../client/client';

export default async (client: BClient, interaction: ButtonInteraction) => {
	try {
		const customId = interaction.customId.split('_');
		if (!subCommands[customId[0]]) return;
		await subCommands[customId[0]](client, interaction);
	} catch (error) {
		console.error(error);
	}
};

const subCommands: Record<string, (client: BClient, interaction: ButtonInteraction) => Promise<any>> = {
	// functions to handle buttons
};
