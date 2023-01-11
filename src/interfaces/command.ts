import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import Client from '../client/client';

export interface Command {
	name: string;
	description: string;
	options?: ApplicationCommandOptionData[];
	usage?: string;
	aliases?: string[];
	category?: 'user' | 'admin';
	cooldown?: number;
	serverOwnerOnly?: boolean;

	execute: (client: typeof Client, message: CommandInteraction) => Promise<any>;
}
