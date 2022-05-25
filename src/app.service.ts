/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import { AuthService } from './auth/auth.service';
import * as bycrypt from 'bcrypt'

import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    //@Inject('TASKS') private tasks: any[],
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private authService: AuthService,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.mongo.dbName;
    return `Hello World! ${apiKey} ${name}`;
  }

  async getUsers(email: string):  Promise<any>{
    const collection = this.database.collection('Users');
    try {
      if(email){
        const users = collection.find({"email": email}).toArray();
        return users;
      }else{
        const collection = this.database.collection('Users');
        const users = collection.find().toArray();
        return users;
      }
    } catch (error) {
      return(error.message);
    }
  }
  
  async getMusic(popularity: number): Promise<any>{
    const collection = this.database.collection('Songs');
    try {
      if(popularity){
        const users = collection.find({"song_popularity": popularity}).toArray();
        return users;
      }else{
        const users = collection.find().toArray();
        return users;
      }
    } catch (error) {
      return(error.message);
    }
  }

  async addUser(infoUser:any): Promise<any>{
    const collection = this.database.collection('Users');
    try {
      const user = await this.getUsers(infoUser.email);
      if(user === null){
        return "Usuario existente";
      }else{
        infoUser.password = await bycrypt.hash(infoUser.password,10);
        const users = collection.insertOne(infoUser);
        return users;
      }
    } catch (error) {
      return(error.message);
    }
  }

  async loginUser(User:any): Promise<any>{
    try {
      const user = await this.getUsers(User.email);
      console.log(user[0])
      if(user.length === 0){
        return "Usuario no existente";
      }else{
        return bycrypt.compare(User.password, user[0].password)
        .then((response) => {
            if (response === true) {
                return this.authService.login({user: User.name, id: User._id});
            } else {
                throw new Error('Informacion invalida')
            }
        }).catch((error)=>{
            return error.message;
        })
      }
    } catch (error) {
      return(error.message);
    }
  }

}