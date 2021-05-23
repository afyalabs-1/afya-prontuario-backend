import dotenv from 'dotenv';
import app from './app';
import 'reflect-metadata';
import './database';

dotenv.config();

app.listen(3333, () => {
	console.log("Server's running!⚡⚡⚡");
});
