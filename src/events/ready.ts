import { BClient } from '../client/client';
import { Setting } from '../entities/Setting';
import { Event } from '../interfaces/event';
import { serverSettings } from '../interfaces/serverSettings';

export const event: Event = {
	name: 'ready',
	execute: async (client) => {
		console.log(`I am ready! ${client.user?.tag}`);
		loadSettings(client);
	}
};

const loadSettings = async (client: BClient) => {
	try {
		const allSet = await Setting.find();
		if (!allSet) return;
		for (const set of allSet) {
			const serverSet: serverSettings = {
				managerRoleId: set.managerRoleId
			};
			client.serverSettings.set(set.guildId, serverSet);
		}
	} catch (error) {
		console.error(error);
	}
};
