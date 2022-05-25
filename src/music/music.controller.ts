/* eslint-disable prettier/prettier */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('music')
export class MusicController {
    constructor(private readonly appservice: AppService){}

    @Get('')
    async getUser(@Query('popularity') popularity: number):  Promise<any>{
        try{
            const user = await this.appservice.getMusic(popularity);
            return user;
        }catch(error){
            return error.message;
        }
    }

}
