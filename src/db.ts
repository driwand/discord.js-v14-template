import { DataSource } from 'typeorm';
import { Setting } from './entities/Setting';
import { path } from 'app-root-path';

const dbDirectory = `${path}/data`;

const connectDb = async () => {
	try {
		const dataSource = new DataSource({
			type: 'sqlite',
			database: `${dbDirectory}/db.sqlite`,
			entities: [Setting],
			logging: true,
			synchronize: true
		});
		await dataSource.initialize();
		console.log('Database connected');
	} catch (error) {
		console.error(error);
	}
};

export default connectDb;
