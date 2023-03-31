export const ownerIds = process.env.BOT_OWNER_IDS ? process.env.BOT_OWNER_IDS.split(',') : [];

export const clientId = process.env.CLIENT_ID ?? '';
export const botToken = process.env.BOT_TOKEN ?? '';

export const serverPort = process.env.PORT ?? '3000';
export const validApiKey = process.env.VALID_API_KEY;

export const embedColor = '#668cff';
