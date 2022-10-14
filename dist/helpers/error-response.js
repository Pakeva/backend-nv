"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const errorResponse = (e, res) => {
    console.log(e);
    return res.status(400).json({
        msg: 'ERROR - Contacta a soporte tecnico para seguimiento del error'
    });
};
exports.errorResponse = errorResponse;
