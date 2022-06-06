/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { DatabaseModule  } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MusicController } from './music/music.controller';
import { AuthModule } from './auth/auth.module';
import { SongsController } from './songs/songs.controller';
import { LikedController } from './liked/liked.controller';
import config from './config';

@Module({
  imports: [ConfigModule.forRoot({
      envFilePath: `.env`,
      load: [config],
      isGlobal: true,
  }), DatabaseModule, AuthModule],
  controllers: [AppController, UsersController, MusicController, SongsController, LikedController],
  providers: [AppService],
})
export class AppModule {}
