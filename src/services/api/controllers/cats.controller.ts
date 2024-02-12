import { Response } from 'express';
import {
    response200WithData,
    response204,
    response404WithMessage,
    response400WithMessage,
} from 'common/helpers/expressRes.helper';

import { AtelierRequest } from 'common/types/request.types';
import { fetchCats } from 'common/helpers/axios.helper';

import { IAtelierCat, INewCat } from 'common/types/cat.types';
import { findCatBy, getRankedCats, incCatPoints, insertCats } from '../managers/cats.manager';
import { createDuel, findRandomDuel, isDuelExist } from '../managers/duels.manager';

export const getCatsController = async (req: AtelierRequest, res: Response) => {
    const cats = await getRankedCats();

    if (cats.length === 0) {
        const response = await fetchCats('https://data.latelier.co/', 'GET', 'cats.json');
        if (response.status === 200) {
            let newCats: INewCat[] = [];
            response.content.images.map((cat: IAtelierCat) => {
                if (typeof cat.id === 'string' && typeof cat.url === 'string') {
                    newCats.push({
                        external_id: cat.id,
                        picture_url: cat.url,
                    });
                }
            });

            await insertCats(newCats);

            response200WithData(res, { cats: newCats });

            return;
        }

        response400WithMessage(res, 'Can not fetch atelier cats');

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

    const winner = await findCatBy('_id', winnerId);

    if (!winner) return response404WithMessage(res, 'Winner cat not found');

    const loser = await findCatBy('_id', loserId);

    if (!loser) return response404WithMessage(res, 'Loser Cat not found');

    const duel = await isDuelExist(winnerId, loserId);

    if (duel) return response400WithMessage(res, 'Duel already done');

    await createDuel(winnerId, loserId);

    const nextDuel = await findRandomDuel();

    if (!nextDuel) return response204(res);

    response200WithData(res, { nextDuel });
};
