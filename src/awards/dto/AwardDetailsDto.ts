import 'reflect-metadata';
import { Expose, Type } from 'class-transformer';

export class AwardDetailsDto{

    @Expose()
    name!: string;

    @Expose()
    nomination!: string;

    @Expose()
    @Type(() => Date)
    date?: Date;

    @Expose()
    songId!: number;

}