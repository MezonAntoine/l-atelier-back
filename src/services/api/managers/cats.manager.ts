import { Types } from 'mongoose';

import { CatModel } from 'common/models/Cat';
import { ICat, ICatNumberOf, INewCat } from 'common/types/cat.types';

export const getRankedCats = async (): Promise<ICat[]> => {
    return await CatModel.aggregate([
        {
            $project: {
                picture_url: 1,
                external_id: 1,
                'number_of.votes': 1,
                'number_of.victories': 1,
                'number_of.defeats': 1,
                classement: {
                    $switch: {
                        branches: [
                            {
                                case: {
                                    $and: [
                                        { $eq: ['$number_of.defeats', Number(0)] },
                                        { $gt: ['$number_of.victories', Number(0)] },
                                    ],
                                },
                                then: 1, // Chats sans défaites et avec victoires
                            },
                            {
                                case: { $ne: ['$number_of.defeats', 0] },
                                then: 3, // Chats sans victoires et avec défaite
                            },
                            {
                                case: {
                                    $and: [
                                        { $eq: ['$number_of.victories', 0] },
                                        { $eq: ['$number_of.defeats', 0] }, // Chats sans victoire ni défaite
                                    ],
                                },
                                then: 4, // Chats sans victoire ni défaite
                            },
                        ],
                        default: 2, // Autres cas
                    },
                },
            },
        },
        {
            $sort: { classement: 1, 'number_of.victories': -1, 'number_of.defeats': 1 }, // Tri par classement croissant, nombre de victoires non croissant, et enfin par nombre de défaite croissant
        },
    ]);
};

export const insertCats = async (newCats: INewCat[]) => {
    await CatModel.insertMany(newCats);
};

export const findCatBy = async (key: string, value: string): Promise<ICat | null> => {
    return await CatModel.findOne({ [key]: value }, '_id number_of');
};

export const incCatPoints = async (catId: Types.ObjectId, isWinner: boolean) => {
    let toInc: ICatNumberOf = {
        'number_of.votes': 1,
    };

    toInc[isWinner ? 'number_of.victories' : 'number_of.defeats'] = 1;

    await CatModel.findByIdAndUpdate(catId, {
        $inc: toInc,
    });
};

export const findRandomCat = async (impossibleDuelIds: Types.ObjectId[]): Promise<ICat[]> => {
    return await CatModel.aggregate([
        {
            $match: {
                _id: { $nin: impossibleDuelIds },
            },
        },
        { $project: { _id: 1, picture_url: 1 } },
        { $sample: { size: 1 } },
    ]);
};
