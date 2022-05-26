/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('songs')
export class SongsController {
    constructor(private readonly appservice:AppService){}

    @Get('')
    async getSongs(@Query('track_id') track_id: string): Promise<any> {
        try{
            const songs = await this.appservice.getSong(track_id);
            return songs;
        }catch(error){
            return error.message;
        }
    }

}
