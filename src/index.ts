import 'reflect-metadata';
import dotenv from 'dotenv';
import log4js from 'log4js';
import { useEnv } from './useEnv';
//import config from './config';
import { connectDb } from './database.connect';
import http from 'http';
import app from './app';

async function start(): Promise<void> {
    dotenv.config();

    const { HOST, PORT, MONGO_ADDRESS } = useEnv();

    //log4js.configure(config.log4js);

    const server = http.createServer(app);

    server.listen(PORT, HOST, async () => {
        log4js
            .getLogger()
            .info(`🚀 Example app listening on port: http://${HOST}:${PORT}`);
        console.log(`🚀 Example app listening on port: http://${HOST}:${PORT}`);

    });

    await connectDb(MONGO_ADDRESS);
}

start();

