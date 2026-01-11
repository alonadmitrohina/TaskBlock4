import request = require('supertest');
import mongoose from 'mongoose';
import app from '../../app';
import * as AwardsService from '../awards.service';
import { plainToInstance } from 'class-transformer';
import { AwardQueryDto } from '../dto/AwardQueryDto';
import { AwardCreateDto } from '../dto/AwardCreateDto';
import { SongAwardsDto } from '../dto/SongAwardsDto';

describe('Awards Controller', () => {

    describe('POST /api/awards', () => {
        test('Should create an award', async () => {
            const id = new mongoose.Types.ObjectId().toString();
            const dto: AwardCreateDto = {
                name: 'Grammy',
                nomination: 'Best Song',
                date: new Date('2024-01-01'),
                songId: 1,
            };
            jest.spyOn(AwardsService, 'create').mockResolvedValueOnce(id);

            const response = await request(app).post('/api/awards').send(dto);
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ id });
        });

        test('Should validate empty fields and return 400', async () => {
            const response = await request(app).post('/api/awards').send({});
            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                    'name must be a string',
                    'nomination must be a string',
                    'songId must be an integer number',
                ])
            );
        });
    });

    describe('GET /api/awards', () => {
        test('Should return awards by songId', async () => {
            const dto: AwardQueryDto = plainToInstance(AwardQueryDto, {
                songId: 1,
                from: 0,
                size: 10,
            });

            const awards = [
                { name: 'A1', nomination: 'N1', date: new Date('2024-01-01'), songId: 1 },
                { name: 'A2', nomination: 'N2', date: new Date('2024-02-01'), songId: 1 },
            ];

            jest.spyOn(AwardsService, 'getBySong').mockResolvedValueOnce(awards as any);

            const response = await request(app)
                .get('/api/awards')
                .query({ songId: 1, from: 0, size: 10 });

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body[0].songId).toBe(1);
        });

        test('Should return 400 if validation fails', async () => {
            const response = await request(app)
                .get('/api/awards')
                .query({ songId: 'o' });
            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/awards/_counts', () => {
        test('Should return awards counts', async () => {
            const dto: SongAwardsDto = { songsIds: [1, 2] };
            const counts = [
                { _id: 1, count: 2 },
                { _id: 2, count: 1 },
            ];
            jest.spyOn(AwardsService, 'getCounts').mockResolvedValueOnce(counts as any);

            const response = await request(app)
                .post('/api/awards/_counts')
                .send(dto);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(counts);
        });

        test('Should return 400 if songsIds is missing', async () => {
            const response = await request(app)
                .post('/api/awards/_counts')
                .send({});
            expect(response.status).toBe(400);
        });
    });

});
