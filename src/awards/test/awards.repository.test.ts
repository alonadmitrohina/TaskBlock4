import 'reflect-metadata';
import * as awardsRepository from '../awards.repository';
import {
    clearDatabase,
    startMongoContainer,
    stopMongoContainer,
} from '../../test/mongo.setup';
import { AwardModel } from '../awards.model';
import { plainToInstance } from 'class-transformer';
import { AwardQueryDto } from '../dto/AwardQueryDto';
import { SongAwardsDto } from '../dto/SongAwardsDto';

describe('Awards Repository', () => {
    beforeAll(async () => {
        await startMongoContainer();
    });

    afterAll(async () => {
        await stopMongoContainer();
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    describe('create', () => {
        test('should create award', async () => {
            const id = await awardsRepository.create({
                name: 'Grammy',
                nomination: 'Best Song',
                date: new Date('2024-01-01'),
                songId: 1,
            });

            expect(id).toBeDefined();

            const award = await AwardModel.findById(id);
            expect(award).not.toBeNull();
            expect(award?.name).toBe('Grammy');
        });
    });

    describe('findBySong', () => {
        test('should return awards by songId with pagination', async () => {
            await createSongs();
            const query = plainToInstance(AwardQueryDto, {
                songId: 1,
                from: 0,
                size: 2,
            });

            const result = await awardsRepository.findBySong(query);

            expect(result).toHaveLength(2);
            expect(result[0].songId).toBe(1);
        });
    });

    describe('countBySongs', () => {
        test('should count awards by songIds', async () => {
            await createSongs();
            const dto = plainToInstance(SongAwardsDto, {
                songsIds: [1, 2, 3],
            });

            const result = await awardsRepository.countBySongs(dto);

            expect(result).toEqual(
                expect.arrayContaining([
                    { _id: 1, count: 2 },
                    { _id: 2, count: 1 },
                ]),
            );
        });
    });
});

const createSongs = async () => {
    await AwardModel.create(
        {
            name: 'A1',
            nomination: 'N1',
            date: new Date('2024-01-01'),
            songId: 1,
        }
    );
    await AwardModel.create(
        {
            name: 'A2',
            nomination: 'N2',
            date: new Date('2024-02-01'),
            songId: 1,
        }
    );
    await AwardModel.create(
        {
            name: 'A3',
            nomination: 'N3',
            date: new Date('2024-03-01'),
            songId: 2,
        }
    );
}
