"use strict";
exports.__esModule = true;
exports.errorResponse = void 0;
var errorResponse = function (e, res) {
    console.log(e);
    return res.status(400).json({
        msg: 'ERROR - Contacta a soporte tecnico para seguimiento del error'
    });
};
exports.errorResponse = errorResponse;
