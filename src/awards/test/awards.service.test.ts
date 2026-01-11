import 'reflect-metadata';
import * as awardsService from '../awards.service';
import * as awardsRepository from '../awards.repository';
import * as songClient from '../../songs/song.client';
import mongoose from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { AwardCreateDto } from '../dto/AwardCreateDto';
import { AwardQueryDto } from '../dto/AwardQueryDto';
import { SongAwardsDto } from '../dto/SongAwardsDto';
import { BadRequest } from '../../exceptions/BadRequest';

describe('Awards Service', () => {
    describe('create', () => {
        test('should create award if song exists', async () => {
            const awardId = new mongoose.Types.ObjectId().toString();

            const dto = plainToInstance(AwardCreateDto, {
                name: 'Grammy',
                nomination: 'Best Song',
                date: new Date(),
                songId: '1',
            });

            jest.spyOn(songClient, 'songExists').mockResolvedValueOnce(true);
            jest.spyOn(awardsRepository, 'create').mockResolvedValueOnce(awardId);

            const result = await awardsService.create(dto);

            expect(result).toBe(awardId);
        });

        test('should throw BadRequest if song does not exist', async () => {
            const dto = plainToInstance(AwardCreateDto, {
                name: 'Grammy',
                nomination: 'Best Song',
                date: new Date(),
                songId: '999',
            });

            jest.spyOn(songClient, 'songExists').mockResolvedValueOnce(false);

            await expect(awardsService.create(dto)).rejects.toThrow(BadRequest);
        });
    });

    describe('getBySong', () => {
        test('should return awards by songId', async () => {
            const awards = [
                {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'A1',
                    nomination: 'N1',
                    songId: '1',
                },
            ];

            const dto = plainToInstance(AwardQueryDto, {
                songId: '1',
            });

            jest
                .spyOn(awardsRepository, 'findBySong')
                .mockResolvedValueOnce(awards as any);

            const result = await awardsService.getBySong(dto);

            expect(result).toHaveLength(1);
            expect(result[0].songId).toBe('1');
        });
    });

    describe('getCounts', () => {
        test('should return counts for songs', async () => {
            const dto = plainToInstance(SongAwardsDto, {
                songsIds: ['1', '2'],
            });

            jest.spyOn(awardsRepository, 'countBySongs').mockResolvedValueOnce([
                { _id: '1', count: 2 },
            ] as any);

            const result = await awardsService.getCounts(dto);

            expect(result).toEqual({
                '1': 2,
                '2': 0,
            });
        });
    });
});
