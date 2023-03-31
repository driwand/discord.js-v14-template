import { NextFunction, Request, Response } from 'express';
import { BClient } from '../../client/client';
import { exampleFunction } from './example.service';

export const newExample = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const status = await exampleFunction(req.client as BClient);
		return res.status(200).json({ created: status });
	} catch (error) {
		console.error(error);
		next(error);
	}
};
