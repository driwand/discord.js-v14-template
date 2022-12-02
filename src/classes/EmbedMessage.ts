import { EmbedBuilder } from 'discord.js';
import { embedColor } from '../config/config';

class EmbedMessage extends EmbedBuilder {
	constructor() {
		super();
		this.setColor(embedColor);
	}
}

export default EmbedMessage;
