import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config/app';

// parametros para el URI
const db = config.db;
const MONGO_URI = `mongodb://${db.HOST}:${db.PORT}/${db.DATABASE}`;

// mongoose OPTIONS
const dbOptions: ConnectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
};

mongoose.connect(MONGO_URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB connection stablished');
});

connection.on('error', (err) => {
	console.log('MONGO COnnection ERROR::\t', err);
	process.exit(0);
});
