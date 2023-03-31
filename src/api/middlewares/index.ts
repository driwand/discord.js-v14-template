import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../classes/CustomError';
import { validApiKey } from '../../config/config';

export const checkClient = (req: Request, res: Response, next: NextFunction) => {
	if (!req.client) {
		res.status(500).json({ error: 'Discord client was not found.' });
	}
	next();
};

export const handleCustomError = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof CustomError) {
		const { statusCode, message } = err;
		res.status(statusCode).json({
			status: 'error',
			statusCode,
			message
		});
	} else {
		res.status(500).json({
			status: 'error',
			statusCode: 500,
			message: 'Internet Server Error'
		});
	}
};

export const apiKeyCheck = (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.headers['x-api-key'];
	if (!apiKey || !validApiKey || apiKey !== validApiKey) {
		return res.status(401).json({ message: 'Invalid API key' });
	}
	next();
};
