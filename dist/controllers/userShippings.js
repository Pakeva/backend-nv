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
exports.getUserShipping = exports.updateUserShippingStatus = exports.getUserShippings = exports.addNewUserShipping = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const utils_1 = require("../utils");
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
const updateUserShippingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    //@ts-ignore
    const status = req.body.status.toLowerCase();
    if (!utils_1.ENUM_STATUS.includes(status)) {
        return res.status(401).json({
            msg: "No es un status valido"
        });
    }
    const userShipping = yield models_1.UserShipping.findByIdAndUpdate(id, {
        status
    }, { new: true });
    if (!userShipping) {
        return res.status(401).json({
            msg: "No existe el envio consultado"
        });
    }
    return res.status(200).json({
        userShipping
    });
});
exports.updateUserShippingStatus = updateUserShippingStatus;
const getUserShippings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.rol) === 'FINAL_USER') {
        const userShippings = yield models_1.UserShipping.find({
            "user": id
        });
        console.log(userShippings);
        if (!userShippings.length) {
            return res.status(401).json({
                msg: "No cuentas con pedidos realizados"
            });
        }
        return res.status(200).json({
            userShippings
        });
    }
    return res.status(400).json({
        msg: 'El rol no es valido'
    });
});
exports.getUserShippings = getUserShippings;
const getUserShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const shipping = yield models_1.UserShipping.findById(id);
    const user = req.user;
    const addressDestination = {
        street: user === null || user === void 0 ? void 0 : user.street,
        numInt: user === null || user === void 0 ? void 0 : user.numInt,
        numExt: user === null || user === void 0 ? void 0 : user.numExt,
        colony: user === null || user === void 0 ? void 0 : user.colony,
        municipality: user === null || user === void 0 ? void 0 : user.municipality,
        state: user === null || user === void 0 ? void 0 : user.state,
    };
    const userInfo = {
        name: (user === null || user === void 0 ? void 0 : user.name) + ' ' + (user === null || user === void 0 ? void 0 : user.firstLastName),
        phone: user === null || user === void 0 ? void 0 : user.phone,
    };
    if (!shipping) {
        return res.status(401).json({
            msg: "No existe el pedido consultado"
        });
    }
    return res.status(200).json({
        shipping,
        addressDestination,
        userInfo
    });
});
exports.getUserShipping = getUserShipping;
