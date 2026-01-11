import {AwardModel} from './awards.model';
import {AwardCreateDto} from './dto/AwardCreateDto';
import {AwardQueryDto} from './dto/AwardQueryDto';
import {SongAwardsDto} from './dto/SongAwardsDto';

/**
 * Створення Award
 */
export const create = async (
    data: AwardCreateDto,
): Promise<string> => {
    const award = await new AwardModel(data).save();
    return award._id.toString();
};

/**
 * Отримати Awards по songId
 * з пагінацією та сортуванням по даті
 */
export const findBySong = async ({ songId, from, size }: AwardQueryDto) => {
    return AwardModel.find({ songId })
        .sort({ date: -1 })
        .skip(from)
        .limit(size)
        .lean();
};


/**
 * Кількість Awards по кожній пісні
 */
type CountResult = {
    _id: number;
    count: number;
};

export const countBySongs = async (
    dto: SongAwardsDto
): Promise<CountResult[]> => {

    const { songsIds } = dto;

    return AwardModel.aggregate<CountResult>([
        {$match: {songId: {$in: songsIds}}},
        {$group: {_id: '$songId', count: {$sum: 1}}}
    ]);
};

