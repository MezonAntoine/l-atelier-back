import { Request } from 'express';

export interface AtelierRequest extends Request {
    query: {
        limit?: string;
        offset?: string;
    };
}
