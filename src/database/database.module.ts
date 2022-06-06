/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import config from 'src/config';
import { Liked, LikeSchema } from 'src/entities/liked.entity';
import { Song, SongSchema } from 'src/entities/song.entity';
import { User, UserSchema } from 'src/entities/user.entity';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';
// const taskCollection = database.collection('tasks');
// const tasks = await taskCollection.find().toArray();

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          user,
          password,
        } = configService.mongo;
        return {
          uri: `mongodb+srv://${user}:${password}@cluster0.enu8s.mongodb.net/test?authSource=admin&replicaSet=atlas-zuv8ge-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,
        };
      },
      inject: [config.KEY],
    }),
    MongooseModule.forFeature([
      {
        name: User.name , schema: UserSchema
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Liked.name , schema: LikeSchema
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Song.name , schema: SongSchema
      },
    ]),
  ],

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
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
