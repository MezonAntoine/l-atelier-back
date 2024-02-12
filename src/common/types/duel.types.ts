import { Types } from 'mongoose';

export interface IDuel {
    _winner: Types.ObjectId;
    _loser: Types.ObjectId;
}

export interface ICat {
    _id?: string;
    picture_url: string;
    external_id: string;
}

export interface ICatNumberOf {
    'number_of.victories'?: number;
    'number_of.defeats'?: number;
    'number_of.votes'?: number;
}
