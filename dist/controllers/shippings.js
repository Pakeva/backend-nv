"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippings = exports.createShipping = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const createShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //TODO ALL VALIDATIONS
    const body = req.body;
    const newShipping = new models_1.Shipping(Object.assign({}, body));
    newShipping.user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        yield newShipping.save();
        res.status(200).json({
            msg: 'Envio guardado correctamente'
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.createShipping = createShipping;
const getShippings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO ALL VALIDATIONS
    var _b;
    const shippings = yield models_1.Shipping.find({
        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id
    });
    res.status(200).json({
        msg: 'success',
        envios: shippings
    });
});
exports.getShippings = getShippings;
