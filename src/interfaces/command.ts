import { ApplicationCommandOptionData, CommandInteraction, ContextMenuCommandBuilder } from 'discord.js';
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
	menuCommandData?: ContextMenuCommandBuilder;

	execute: (client: typeof Client, message: CommandInteraction) => Promise<any>;
}
