import 'reflect-metadata';
import {
    IsDate, IsIn, IsInt, IsOptional,
    IsString,
    MaxDate, Min,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class AwardCreateDto{

    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    nomination!: string;

    @Expose()
    @IsOptional()
    @IsDate()
    @MaxDate(new Date())
    @Type(() => Date)
    date?: Date;

    @Expose()
    @IsInt()
    songId!: number;

}