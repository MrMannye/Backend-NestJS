/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Song extends Document {
    @Prop({required: true})
    id: number

    @Prop({required: true})
    artist_name: string

    @Prop({required: true})
    track_name: string

    @Prop({required: true})
    track_id: string

    @Prop({required: true})
    popularity: number

    @Prop({required: true})
    danceability: number

    @Prop({required: true})
    energy: number

    @Prop({required: true})
    key: number

    @Prop({required: true})
    loudness: string

    @Prop({required: true})
    mode: string

    @Prop({required: true})
    speechiness: string

    @Prop({required: true})
    acousticness: string

    @Prop({required: true})
    instrumentalness: string

    @Prop({required: true})
    liveness: string

    @Prop({required: true})
    valence: string

    @Prop({required: true})
    tempo: string

    @Prop({required: true})
    duration_ms: number

    @Prop({required: true})
    time_signature: string

}

export const SongSchema = SchemaFactory.createForClass(Song);