/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { DatabaseModule  } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MusicController } from './music/music.controller';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
  }), DatabaseModule, AuthModule],
  controllers: [AppController, UsersController, MusicController],
  providers: [AppService],
})
export class AppModule {}
