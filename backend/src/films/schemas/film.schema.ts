import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ISchedule {
  id: string;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface IFilm extends Document {
  id: string;
  rating?: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: ISchedule[];
}

@Schema()
export class ScheduleSchema {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: Date;

  @Prop({ required: true })
  hall: number;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

@Schema()
export class Film {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  rating?: number;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [ScheduleSchema], default: [] })
  schedule: ISchedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
