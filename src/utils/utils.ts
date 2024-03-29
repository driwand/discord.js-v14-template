import { GuildMember, Message, PermissionsBitField } from 'discord.js';
import EmbedMessage from '../classes/EmbedMessage';
import { BClient } from '../client/client';
import { ownerIds } from '../config/config';

export { isAdmin, sendUsage, replaceAllOccurrence, getServerSettings };

const isAdmin = (client: BClient, member: GuildMember, guildId: string) => {
	const managerRole = client.serverSettings.get(guildId)?.managerRoleId ?? '';
	return (
		ownerIds.includes(member.id) ||
		member.permissions.has([PermissionsBitField.Flags.Administrator]) ||
		member.roles.cache.has(managerRole)
	);
};

const sendUsage = async (client: BClient, msg: Message, usage: string) => {
	if (!msg.guildId) return;
	const resUsage = usage.includes('{prefix}') ? replaceAllOccurrence(usage, '{prefix}', '/') : usage;
	const embed = new EmbedMessage();
	embed.setTitle('Right usage:');
	embed.setDescription(resUsage);
	msg.reply({ embeds: [embed] });
};

const replaceAllOccurrence = (str: string, search: string, replace: string): string => {
	return str.split(search).join(replace);
};

const getServerSettings = (client: BClient, guildId: string) => {
	const managerRoleId = client.serverSettings.get(guildId)?.managerRoleId ?? null;
	return { managerRoleId };
};
