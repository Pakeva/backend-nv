import express from "express";
import {validationResult} from 'express-validator';
import {Next} from "../interfaces";

export const validateFields = (req: express.Request, res: express.Response, next:Next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    next();
}