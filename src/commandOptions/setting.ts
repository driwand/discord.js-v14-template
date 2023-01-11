import { ApplicationCommandOptionData } from 'discord.js';
import ApplicationOptionTypes from '../constants/applicationOptionTypes';

export default [
	{
		type: ApplicationOptionTypes.ROLE,
		name: 'role',
		description: 'Select a role for bot manager'
	},
	{
		type: ApplicationOptionTypes.STRING,
		name: 'unset',
		description: 'Unset an option from the bot settings (note: this option should be used individually)',
		choices: [
			{
				name: 'Manager Role',
				value: 'role'
			}
		]
	}
] as ApplicationCommandOptionData[];
