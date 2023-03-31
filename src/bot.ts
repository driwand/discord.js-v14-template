import 'dotenv/config';
import { botToken, serverPort } from './config/config';
import client from './client/client';
import connectDb from './db';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import routers from './api/index';
import cors from 'cors';
import { handleCustomError } from './api/middlewares';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
	// assign the discord client to the request in order to use in further endpoints
	req.client = client;
	next();
});

// use the middleware apiKeyCheck to check for a valid API key
app.use('/api/v1', routers);

app.use(handleCustomError);

const main = async () => {
	try {
		await connectDb();
		await client.init();
		await client.login(botToken);
		startApi();
	} catch (error) {
		console.error(error);
	}
};

const startApi = () => {
	app.listen(serverPort, () => {
		console.log(`Server started on port ${serverPort}`);
	});
};

main();
