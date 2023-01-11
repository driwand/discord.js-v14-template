import { CacheType, CommandInteraction, CommandInteractionOption } from 'discord.js';
import EmbedMessage from '../classes/EmbedMessage';
import { BClient } from '../client/client';
import { Setting } from '../entities/Setting';
import { Command } from '../interfaces/command';
import setting from '../commandOptions/setting';
import { getServerSettings } from '../utils/utils';
import { serverSettings } from '../interfaces/serverSettings';

interface InputOptions {
	unset: CommandInteractionOption<CacheType> | null;
	serverSettings: serverSettings;
}

const dbMapper = {
	role: 'managerRoleId',
	prefix: 'prefix'
};

const validOptions = ['role'];

export const command: Command = {
	name: 'settings',
	description: 'Change the bot settings',
	category: 'admin',
	options: setting,

	async execute(client, interaction: CommandInteraction) {
		try {
			if (!interaction.guild || !interaction.isChatInputCommand()) return;
			const guildId = interaction.guild.id;
			const unset = interaction.options.get('unset');
			const userOptions = validOptions.map((elm) => interaction.options.get(elm)).filter((e) => e);
			let serverSettings: Partial<serverSettings>;
			if (!unset) {
				serverSettings = userOptions.reduce((prev: Partial<serverSettings>, elm) => {
					if (!elm) return prev;
					const dbField = dbMapper[elm.name as keyof typeof dbMapper];
					prev[dbField] = elm.value;
					return prev;
				}, {});
			} else {
				const dbField = dbMapper[unset.value as keyof typeof dbMapper];
				serverSettings = {
					[dbField as keyof typeof serverSettings]: null
				};
			}
			const options: InputOptions = { unset, serverSettings };
			await saveChanges(client, guildId, options);
			await sendInfo(client, interaction);
		} catch (error) {
			console.error(error);
		}
	}
};

const saveChanges = async (client: BClient, guildId: string, options: InputOptions) => {
	const { serverSettings } = options;
	await Setting.create({ guildId, ...serverSettings } as Setting).save();
	const settings = await Setting.findOneBy({ guildId });
	if (!settings) return;
	client.serverSettings.set(guildId, settings);
};

const sendInfo = async (client: BClient, interaction: CommandInteraction) => {
	if (!interaction.guildId) return;

	const guildId = interaction.guildId;
	const botName = client.user?.username ?? 'Bot';
	const botAvatar = client.user?.avatarURL();

	const guildSettings = getServerSettings(client, guildId);
	const { managerRoleId } = guildSettings;

	const exists = await Setting.findOneBy({ guildId });
	if (!exists) {
		return interaction.reply(`Setup my initial settings for the first time using \`/set init\`.`);
	}

	const generalSet = `**Manger Role**: ${managerRoleId ? `<@&${managerRoleId}>` : 'None'}\n`;

	const embed = new EmbedMessage();
	embed.setTitle('Settings');
	embed.setAuthor({ name: botName, ...(botAvatar && { iconURL: botAvatar }) });
	embed.addFields({ name: '__General__', value: generalSet, inline: true });

	await interaction.reply({ embeds: [embed] });
};
