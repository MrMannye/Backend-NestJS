/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { Model, Schema as MongooseSchema } from 'mongoose';
import * as bycrypt from 'bcrypt'

import config from './config';
import { User } from './entities/user.entity';
import { Song } from './entities/song.entity';
import { Liked } from './entities/liked.entity';


interface LikedSong{ 
  idUser: MongooseSchema.Types.ObjectId
  idSong: MongooseSchema.Types.ObjectId
}
interface SongLiked{
  idUser: MongooseSchema.Types.ObjectId
}

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Song.name) private readonly songModel: Model<Song>,
    @InjectModel(Liked.name) private readonly likedModel: Model<Liked>,
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
    try {
      if(email){
        const user = await this.userModel.findOne({"email": email});
        return user;
      }else{
        const users = await this.userModel.find({});
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
    try {
      const user = await this.userModel.findOne({"email": infoUser.email});
      console.log(user)
      if(user){
        return ("Usuario existente")
      }else{
        infoUser.password = await bycrypt.hash(infoUser.password,10);
        const newUser = new this.userModel(infoUser)
        await newUser.save()
        return newUser;
      }
    } catch (error) {
      return(error.message);
    }
  }

  async loginUser(User:any): Promise<any>{
    try {
      const user = await this.getUsers(User.email);
      console.log(user)
      if(!user){
        return "Usuario no existente";
      }else{
        return bycrypt.compare(User.password, user.password)
        .then((response) => {
            if (response === true) {
                return {
                  jwt: this.authService.login({user: User.name, id: User._id}),
                  name: user.name,
                  email: user.email,
                  admin: user.admin,
                  id: user._id
                };
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

  async getSong(track_id: string):  Promise<any>{
    try {
      if(track_id){
        const song = await this.songModel.findOne({"track_id": track_id});
        return song;
      }else{
        const song = await this.songModel.find({});
        return song;
      }
    } catch (error) {
      return(error.message);
    }
  }

  async getSongLiked(song: SongLiked): Promise<any>{
    try {
      const user = await this.likedModel.find({user: song.idUser});
      console.log(user)
      if(user.length !== 0){
        try {
          this.likedModel.findOne({user: song.idUser})
          .populate('user')
          .populate('songs')
          .exec((error, populated) => {
            if (error) {
              console.log(error)
              return (`[addUpdateSongs] fallo en el FindOne ${error}`);
            } else {
                console.log(populated)
                return populated; //retornamos el documento poblado
            }
        })
        } catch (error) {
          return error
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async addSongLiked(song:LikedSong): Promise<any>{
    try {
      const user = await this.likedModel.find({user: song.idUser});
      console.log(user)
      if(user.length !== 0){
        const songFound = await this.likedModel.findOne({songs: song.idSong});
        console.log(songFound)
        if(songFound ){
          return "[app.service] Song Added to your liked songs"
        }
        await this.likedModel.findOneAndUpdate({user: song.idUser}, {$push: {'songs': song.idSong}})
        try {
          this.likedModel.findOne({user: song.idUser})
          .populate('user')
          .populate('songs')
          .exec((error, populated) => {
            if (error) {
              console.log(error)
              return (`[addUpdateSongs] fallo en el FindOne ${error}`);
            } else {
                console.log(populated)
                return populated; //retornamos el documento poblado
            }
        })
        } catch (error) {
          return error
        }
      }else{
        const newUser = new this.likedModel({
          user: song.idUser,
          songs: song.idSong
        })
        await newUser.save();
        return newUser;
      }
    } catch (error) {
      console.log(error)
    }
  }
}