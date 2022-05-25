/* eslint-disable prettier/prettier */
import { Controller, Get, Query, Post, Body, Put, UseGuards } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface User {
    name: string,
    lastname: string,
    email: string,
    password: string
}

interface loginUser {
    email: string, 
    password: string
}

@Controller('users')
export class UsersController {
    constructor(private readonly appservice: AppService){}

    @Get('')
    async getUser(@Query('email') email: string):  Promise<any>{
        try{
            const user = await this.appservice.getUsers(email);
            return user;
        }catch(error){
            return error.message;
        }
    }

    @Post('/addUser')
    async addUser(@Body() infoUser: User):  Promise<any>{
        try{
            const user = await this.appservice.addUser(infoUser);
            return user;
        }catch(error){
            return error.message;
        }
    }

    @Post('/loginUser')
    async loginUser(@Body() User: loginUser):  Promise<any>{
        try{
            const user = await this.appservice.loginUser(User);
            return user;
        }catch(error){
            return error.message;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/loginUser')
    async infoUser(@Body() User: loginUser):  Promise<any>{
        try{
            const user = await this.appservice.loginUser(User);
            return user;
        }catch(error){
            return error.message;
        }
    }

}
