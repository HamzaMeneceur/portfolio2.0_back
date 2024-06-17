import debug from "debug";

const logError = debug("error:API");

import logger from "./logger.js";

import APIError from "./APIError.js";
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
    logError('error', err)
    console.log(err);
    logger.log('error', err.message);
    if (err instanceof APIError){
        if (process.env.NODE_ENV === 'development') {
            return res.status(err.status).json({ status: 'error', message: err.message, stack: err.stack });
        }
        return res.status(err.status).json({ status: 'error', message: err.message });
    }
    if (process.env.NODE_ENV === 'development') {
        return res.status(500).json({ status:'error', message: err.message, stack: err.stack });
    }
    return res.status(500).json({ status:'error', message: 'Internal server error' });
};

export default errorHandler