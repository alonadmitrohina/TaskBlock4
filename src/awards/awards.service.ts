import { BadRequest } from '../exceptions/BadRequest';
import * as AwardsRepository from './awards.repository';
import * as SongClient from '../songs/song.client';
import {AwardQueryDto} from "./dto/AwardQueryDto";
import {AwardCreateDto} from "./dto/AwardCreateDto";
import {SongAwardsDto} from "./dto/SongAwardsDto";

/**
 *
 */
export const create = async (dto: AwardCreateDto): Promise<string> => {
    const exists = await SongClient.songExists(dto.songId);

    if (!exists) {
        throw new BadRequest('Song not found');
    }

    return AwardsRepository.create(dto);
};

/**
 *
 */
export const getBySong = async (
    dto: AwardQueryDto,
) => {
    return AwardsRepository.findBySong(dto);
};

/**
 *
 */
type CountResult = {
    _id: number;
    count: number;
};

export const getCounts = async (
    dto: SongAwardsDto,
): Promise<Record<number, number>> => {

    const data: CountResult[] = await AwardsRepository.countBySongs(dto);

    const result: Record<number, number> = {};
    dto.songsIds.forEach(id => {
        result[id] = 0;
    });

    data.forEach(item => {
        result[item._id] = item.count;
    });

    return result;
};





