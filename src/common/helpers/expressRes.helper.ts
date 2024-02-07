//-- 200 Ok

import { Response } from "express";

//-- do not use except exceptions
const response200 = (res: Response, body?: any) => {
    res.status(200).json(body);
};

const response200WithData = (res: Response, data: any) => {
    response200(res, {
        data,
    });
};

const response200WithMessage = (res: Response, message: string) => {
    response200(res, {
        message,
    });
};

const response200WithDataAndMessage = (res: Response, data: any, message: string) => {
    response200(res, {
        data,
        message,
    });
};

//-- 201 Created

//-- do not use except exceptions
const response201 = (res: Response, body?: any) => {
    res.status(201).json(body);
};

const response201WithData = (res: Response, data: any) => {
    response201(res, {
        data,
    });
};

const response201WithMessage = (res: Response, message: string) => {
    response201(res, {
        message,
    });
};

const response201WithDataAndMessage = (res: Response, data: any, message: string) => {
    response201(res, {
        data,
        message,
    });
};

//-- 204 No Content

const response204 = (res: Response) => {
    res.status(204).send();
};

//-- 400 Bad Request

//-- do not use except exceptions
const response400 = (res: Response, body: any) => {
    res.status(400).json(body);
};

const response400WithMessage = (res: Response, message: string) => {
    response400(res, {
        message,
    });
};

const response400WithMessageAndCode = (res: Response, message: string, code: number) => {
    response400(res, {
        message,
        code,
    });
};

//-- 401 Unauthorized

//-- do not use except exceptions
const response401 = (res: Response, body: any) => {
    res.status(401).json(body);
};

const response401WithMessage = (res: Response, message: string) => {
    response401(res, {
        message,
    });
};

//-- 403 Forbidden

//-- do not use except exceptions
const response403 = (res: Response, body: any) => {
    res.status(403).json(body);
};

const response403WithMessage = (res: Response, message: string) => {
    response403(res, {
        message,
    });
};

const response403WithMessageAndCode = (res: Response, message: string, code: number) => {
    response403(res, {
        message,
        code,
    });
};

//-- 404 Not Found

//-- do not use except exceptions
const response404 = (res: Response, body: any) => {
    res.status(404).json(body);
};

const response404WithMessage = (res: Response, message: string) => {
    response404(res, {
        message,
    });
};

//-- 409 Conflit

//-- do not use except exceptions
const response409 = (res: Response, body: any) => {
    res.status(404).json(body);
};

const response409WithMessage = (res: Response, message: string) => {
    response404(res, {
        message,
    });
};

//-- 500 Internal Server Error

//-- do not use except exceptions
const response500 = (res: Response, body: any) => {
    res.status(500).json(body);
};

const response500WithMessage = (res: Response, message: string) => {
    response500(res, {
        message,
    });
};

export {
    response200,
    response200WithData,
    response200WithMessage,
    response200WithDataAndMessage,
    response201,
    response201WithData,
    response201WithMessage,
    response201WithDataAndMessage,
    response204,
    response400,
    response400WithMessage,
    response400WithMessageAndCode,
    response401,
    response401WithMessage,
    response403,
    response403WithMessage,
    response403WithMessageAndCode,
    response404,
    response404WithMessage,
    response409,
    response409WithMessage,
    response500,
    response500WithMessage,
};