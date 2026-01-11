import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import * as AwardsService from './awards.service';
import {plainToInstance} from "class-transformer";
import {AwardQueryDto} from "./dto/AwardQueryDto";
import {AwardCreateDto} from "./dto/AwardCreateDto";
import {SongAwardsDto} from "./dto/SongAwardsDto";
import {validate} from "class-validator";
import {Query} from "mongoose";

/**
 * POST /api/awards
 */
export const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto = plainToInstance(AwardCreateDto, req.body);
        const errors = await validate(dto);
        if (errors.length) {
            return res.status(400).json({ errors: errors.map(e => Object.values(e.constraints!).join(', ')) });
        }
        const id = await AwardsService.create(dto);
        res.status(201).json({ id });
    } catch (err) {
        next(err);
    }
};


/**
 * GET /api/awards
 * ?songId=1&from=0&size=10
 */
export const getBySong = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto = plainToInstance(AwardQueryDto, req.query);

        const errors = await validate(dto);
        if (errors.length) {
            return res.status(400).json(errors);
        }
        const result = await AwardsService.getBySong(dto);

        res.json(result);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/awards/_counts
 */
export const getCounts =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = plainToInstance(SongAwardsDto, req.body, { enableImplicitConversion: true });

            const errors = await validate(dto);
            if (errors.length) {
                return res.status(400).json({
                    errors: errors.flatMap(e => Object.values(e.constraints!)),
                });
            }

            const result = await AwardsService.getCounts(dto);
            res.json(result);
        } catch (err) {
            next(err);
        }
};
