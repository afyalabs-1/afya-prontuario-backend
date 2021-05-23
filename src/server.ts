import dotenv from 'dotenv';
import app from './app';
import 'reflect-metadata';
import './database';

dotenv.config();

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server's running on port ${process.env.API_PORT}!⚡⚡⚡`);
});
