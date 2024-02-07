import { Response } from 'express';
import {
    response200WithData,
    response204,
    response404WithMessage,
    response400WithMessage,
} from 'common/helpers/expressRes.helper';

import { AtelierRequest } from 'common/types/request.types';
import { fetchCats } from 'common/helpers/axios.helper';
import { DuelModel } from 'common/models/Duel';
import { CatModel } from 'common/models/Cat';

import { ICat, IAtelierCat } from 'common/types/cat.types';

export const getCatsController = async (req: AtelierRequest, res: Response) => {
    const cats = await CatModel.find({}, '_id picture_url number_of').sort({ 'number_of.victories': -1 });

    if (cats.length === 0) {
        const response = await fetchCats('https://data.latelier.co/', 'GET', 'cats.json');
        if (response.status === 200) {
            let newCats: ICat[] = [];
            response.content.images.map((cat: IAtelierCat) => {
                if (typeof cat.id === 'string' && typeof cat.url === 'string') {
                    newCats.push({
                        external_id: cat.id,
                        picture_url: cat.url,
                    });
                }
            });
            await CatModel.insertMany(newCats);

            response200WithData(res, { cats: newCats });
        }

        return;
    }

    response200WithData(res, { cats });
};

export const getNextDuelController = async (req: AtelierRequest, res: Response) => {
    const nextDuel = await findRandomDuel();

    if (!nextDuel) return response204(res);

    response200WithData(res, { nextDuel });
};

export const postDuelController = async (req: AtelierRequest, res: Response) => {
    const { winnerId, loserId } = req.body;

    if (winnerId === loserId) return response400WithMessage(res, 'Same cat id');

    const winner = await CatModel.findOne({ _id: winnerId }, '_id number_of');

    if (!winner) return response404WithMessage(res, 'Winner cat not found');
    
    const loser = await CatModel.findOne({ _id: loserId }, '_id number_of');

    if (!loser) return response404WithMessage(res, 'Loser Cat not found');

    const duel = await DuelModel.findOne(
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
    if (duel) return response400WithMessage(res, 'Duel already done');

    await new DuelModel({
        _loser: loserId,
        _winner: winnerId,
    }).save();

    await CatModel.findByIdAndUpdate(winnerId, {
        $inc: {
            'number_of.victories': 1,
            'number_of.votes': 1,
        },
    });

    await CatModel.findByIdAndUpdate(loserId, {
        $inc: {
            'number_of.votes': 1,
            'number_of.defeats': 1,
        },
    });

    const nextDuel = await findRandomDuel();

    if (!nextDuel) return response204(res);

    response200WithData(res, { nextDuel });
};

const findRandomDuel = async () => {
    const doneDuels = await DuelModel.find();

    const impossibleDuelIds: string[] = [];

    while (true) {
        const randomCat = await CatModel.aggregate([
            {
                $match: {
                    _id: { $nin: impossibleDuelIds },
                },
            },
            { $project: { _id: 1, picture_url: 1 } },
            { $sample: { size: 1 } },
        ]);

        // Si pas de chat, tous les duels ont été fait
        if (randomCat.length === 0) {
            return null;
        }

        const firstCat = randomCat[0];

        const votedDuelsIds: any[] = [];

        doneDuels.map((duel: any) => {
            if (firstCat._id.equals(duel._loser)) votedDuelsIds.push(duel._winner);
            else if (firstCat._id.equals(duel._winner)) votedDuelsIds.push(duel._loser);
        });

        const otherRandomCat = await CatModel.aggregate([
            {
                $match: {
                    _id: { $nin: impossibleDuelIds.concat(votedDuelsIds).concat([firstCat._id]) },
                },
            },
            { $project: { _id: 1, picture_url: 1 } },
            { $sample: { size: 1 } },
        ]);
        // Si pas d'adversaire, pas de duels possible
        if (!otherRandomCat || otherRandomCat.length === 0) {
            impossibleDuelIds.push(firstCat._id);
            continue;
        }

        const secondCat = otherRandomCat[0];

        return [firstCat, secondCat];
    }
};
