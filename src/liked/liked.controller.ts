/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Schema as MongooseSchema } from 'mongoose';

interface LikedSong{ 
    idUser: MongooseSchema.Types.ObjectId
    idSong: MongooseSchema.Types.ObjectId
}

@Controller('liked')
export class LikedController {
    constructor(private readonly appService:AppService){}

    @Post('')
    async addSongLiked(@Body() song: LikedSong ): Promise<any>{
        try {
            const songAdded = await this.appService.addSongLiked(song);
            return songAdded;
        } catch (error) {
            return error.message;
        }
    }
}
