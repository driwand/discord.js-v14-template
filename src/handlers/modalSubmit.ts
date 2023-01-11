import { ModalSubmitInteraction } from 'discord.js';
import { BClient } from '../client/client';

export default async (client: BClient, modal: ModalSubmitInteraction) => {
	try {
		const customId = modal.customId.split('_');
		switch (customId[0]) {
			case 'modal_1':
				// function of modal_1
				break;
		}
	} catch (error) {
		console.error(error);
	}
};
