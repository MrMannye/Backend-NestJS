/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';
import { Song } from './song.entity';

@Schema()
export class Liked extends Document {
    @Prop({type: MongooseSchema.Types.ObjectId, ref: User.name})
    user: MongooseSchema.Types.ObjectId

    @Prop({type: [{type: MongooseSchema.Types.ObjectId, ref: Song.name}]})
    songs: [MongooseSchema.Types.ObjectId]
}

export const LikeSchema = SchemaFactory.createForClass(Liked);