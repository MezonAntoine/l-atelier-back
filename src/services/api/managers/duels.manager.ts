import { Types } from 'mongoose';

import { DuelModel } from 'common/models/Duel';
import { findRandomCat, incCatPoints } from './cats.manager';
import { IDuel } from 'common/types/duel.types';
import { ICat } from 'common/types/cat.types';

export const isDuelExist = async (winnerId: Types.ObjectId, loserId: Types.ObjectId): Promise<IDuel | null> => {
    return await DuelModel.findOne(
        {
            $or: [
                {
                    _loser: loserId,
                    _winner: winnerId,
                },
                {
                    _loser: winnerId,
                    _winner: loserId,
                },
            ],
        },
        '_id',
    );
};

export const createDuel = async (winnerId: Types.ObjectId, loserId: Types.ObjectId) => {
    await new DuelModel({
        _loser: loserId,
        _winner: winnerId,
    }).save();

    await incCatPoints(winnerId, true);
    await incCatPoints(loserId, false);
};

export const findRandomDuel = async (): Promise<ICat[] | null> => {
    const doneDuels = await DuelModel.find();

    const impossibleDuelIds: Types.ObjectId[] = [];

    while (true) {
        const randomCat = await findRandomCat(impossibleDuelIds);

        // Si pas de chat, tous les duels ont été fait
        if (randomCat.length === 0) {
            return null;
        }

        const firstCat = randomCat[0];

        const votedDuelsIds: Types.ObjectId[] = [];

        doneDuels.map((duel: IDuel) => {
            if (firstCat._id.equals(duel._loser)) votedDuelsIds.push(duel._winner);
            else if (firstCat._id.equals(duel._winner)) votedDuelsIds.push(duel._loser);
        });

        const otherRandomCat = await findRandomCat(impossibleDuelIds.concat(votedDuelsIds));

        // Si pas d'adversaire, pas de duels possible
        if (!otherRandomCat || otherRandomCat.length === 0) {
            impossibleDuelIds.push(firstCat._id);
            continue;
        }

        return [firstCat, otherRandomCat[0]];
    }
};
