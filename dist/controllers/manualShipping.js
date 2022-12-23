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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewShipping = exports.updateShippingStatus = exports.getAllShippings = exports.getShipping = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const manualShipping_1 = __importDefault(require("../models/manualShipping"));
const ENUM_STATUS = ['pending', 'on-course', 'completed', 'canceled', 'rejected'];
const getShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const shipping = yield manualShipping_1.default.findById(id);
    if (!shipping) {
        return res.status(401).json({
            msg: "No existe el envio consultado"
        });
    }
    return res.status(200).json({
        shipping
    });
});
exports.getShipping = getShipping;
const updateShippingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    //@ts-ignore
    const status = req.body.status.toLowerCase();
    if (!ENUM_STATUS.includes(status)) {
        return res.status(401).json({
            msg: "No es un status valido"
        });
    }
    const shipping = yield manualShipping_1.default.findByIdAndUpdate(id, {
        status
    }, { new: true });
    if (!shipping) {
        return res.status(401).json({
            msg: "No existe el envio consultado"
        });
    }
    return res.status(200).json({
        shipping
    });
});
exports.updateShippingStatus = updateShippingStatus;
const getAllShippings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.rol) === 'CLIENT') {
        const shippingsCompany = yield manualShipping_1.default.find({
            "company.id": id
        });
        if (!shippingsCompany.length) {
            return res.status(401).json({
                msg: "No cuentas con envios realizados"
            });
        }
        return res.status(200).json({
            shippingsCompany
        });
    }
    if (((_c = req.user) === null || _c === void 0 ? void 0 : _c.rol) === 'ASSOCIATED') {
        const shippingsAssociated = yield manualShipping_1.default.find({
            "associated.id": id
        });
        if (!shippingsAssociated.length) {
            return res.status(401).json({
                msg: "No cuentas con envios realizados"
            });
        }
        return res.status(200).json({
            shippingsAssociated
        });
    }
    return res.status(200).json({
        msg: 'Al parecer no cuentas con envios realizados'
    });
});
exports.getAllShippings = getAllShippings;
const addNewShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company = req.user;
    if (!company) {
        return res.status(400).json({
            msg: "Al parecer no tienes activa tu sesion"
        });
    }
    const shipping = req.body;
    if (!shipping) {
        return res.status(400).json({
            msg: "Es necesaria la informacion del envio"
        });
    }
    const associated = yield models_1.User.findById(shipping.associated);
    if (!associated) {
        return res.status(401).json({
            msg: "El asociado/repartidor no esta registrado o ha sido dado de baja"
        });
    }
    const newShipping = new manualShipping_1.default({
        destinationAddress: Object.assign({}, shipping.destinationAddress),
        packageDetails: shipping.packageDetails,
        associated: {
            id: associated.id,
            img: associated.img,
            name: associated.name,
            phone: associated.phone
        },
        company: {
            id: company._id,
            img: company.img,
            name: company.name,
            zip: company.zip,
            state: company.state,
            municipality: company.municipality,
            colony: company.colony,
            street: company.street,
            numExt: company.numExt,
            numInt: company.numInt,
            references: company.referencer,
            phone: company.phone,
        }
    });
    try {
        yield newShipping.save();
        return res.status(201).json({
            msg: "Envio realizado con exito",
            shipping: {
                id: newShipping.id,
                originAddress: newShipping.company,
                associated: newShipping.associated,
                destinationAddress: newShipping.destinationAddress,
                packageDetails: newShipping.packageDetails,
                status: newShipping.status
            }
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.addNewShipping = addNewShipping;
