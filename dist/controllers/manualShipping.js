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
exports.addNewShipping = exports.getShipping = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const manualShipping_1 = __importDefault(require("../models/manualShipping"));
const getShipping = (req, res) => {
    console.log(req.user);
    return res.status(200).json({
        msg: "hello world"
    });
};
exports.getShipping = getShipping;
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
            }
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.addNewShipping = addNewShipping;
