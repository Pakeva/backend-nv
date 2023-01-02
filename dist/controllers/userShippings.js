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
exports.addNewUserShipping = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const addNewUserShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(400).json({
            msg: "Al parecer no tienes activa tu sesion"
        });
    }
    const products = req.body.products;
    const validProducts = products.some((el) => el.id === '');
    if (validProducts) {
        return res.status(400).json({
            msg: "Favor de mandar correctamente el id de los productos"
        });
    }
    if (!products) {
        return res.status(400).json({
            msg: "Son necesarios los productos a pedir"
        });
    }
    const company = yield models_1.User.findById(req.body.company);
    if (!company) {
        return res.status(401).json({
            msg: "La compania no esta registrada o ha sido dado de baja"
        });
    }
    if (company.rol !== 'CLIENT') {
        return res.status(401).json({
            msg: "No es una compania valida"
        });
    }
    const newUserShipping = new models_1.UserShipping({
        products: req.body.products,
        description: req.body.description,
        user: req.body.user,
        company: req.body.company
    });
    console.log(newUserShipping);
    try {
        yield newUserShipping.save();
        return res.status(201).json({
            msg: "Envio realizado con exito",
            shipping: newUserShipping
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.addNewUserShipping = addNewUserShipping;
