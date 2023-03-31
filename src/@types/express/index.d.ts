import { BClient } from '../../client/client';

declare module 'express' {
	interface Request {
		client?: BClient;
	}
}
