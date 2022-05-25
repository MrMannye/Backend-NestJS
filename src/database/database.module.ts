import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from 'src/config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';
// const taskCollection = database.collection('tasks');
// const tasks = await taskCollection.find().toArray();

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const uri = `mongodb+srv://${configService.mongo.user}:${configService.mongo.password}@cluster0.enu8s.mongodb.net/test?authSource=admin&replicaSet=atlas-zuv8ge-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(configService.mongo.dbName);
        return database;
      },
      inject: [config.KEY],
    },
    {
      provide: 'MONGOOSE',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const uri = `mongodb+srv://${configService.mongo.user}:${configService.mongo.password}@cluster0.enu8s.mongodb.net/test?authSource=admin&replicaSet=atlas-zuv8ge-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(configService.mongo.dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', 'MONGOOSE'],
})
export class DatabaseModule {}
