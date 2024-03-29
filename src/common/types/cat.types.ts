import { Types } from 'mongoose';

export interface IAtelierCat {
    id: string;
    url: string;
}

export interface INewCat {
    picture_url: string;
    external_id: string;
}

export interface ICat extends INewCat {
    _id: Types.ObjectId;
}

export interface ICatNumberOf {
    'number_of.victories'?: number;
    'number_of.defeats'?: number;
    'number_of.votes'?: number;
}
