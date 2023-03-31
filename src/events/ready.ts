import { BClient } from '../client/client';
import { Setting } from '../entities/Setting';
import { Event } from '../interfaces/event';

export const event: Event = {
	name: 'ready',
	execute: async (client) => {
		console.log(`I am ready! ${client.user?.tag}`);
		loadSettings(client);
	}
};

const loadSettings = async (client: BClient) => {
	try {
		const allSettings = await Setting.find();
		if (!allSettings) return;
		for (const serverSettings of allSettings) {
			client.serverSettings.set(serverSettings.guildId, serverSettings);
		}
	} catch (error) {
		console.error(error);
	}
};
