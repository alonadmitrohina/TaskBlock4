import {IsInt, Min, IsOptional, IsString} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class AwardQueryDto {

    @Expose()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    songId!: number;

    @Expose()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    from: number = 0;

    @Expose()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    size: number = 10;
}

