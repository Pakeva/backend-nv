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
exports.deleteBounding = exports.getBondingAssociatedToCompany = exports.addAssociatedToCompany = void 0;
const helpers_1 = require("../helpers");
const bondingAssociated_1 = __importDefault(require("../models/bondingAssociated"));
const models_1 = require("../models");
const addAssociatedToCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { associatedID } = req.body;
    const associated = yield models_1.User.findById(associatedID);
    if (!associated) {
        return res.status(401).json({
            msg: 'El asociado fue eliminado o dado de baja'
        });
    }
    const existsBondingAssociated = yield bondingAssociated_1.default.findOne({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        associated: associatedID
    });
    if (existsBondingAssociated) {
        return res.status(401).json({
            msg: 'Ya esta vinculado este asociado'
        });
    }
    const newBondingAssociated = new bondingAssociated_1.default({
        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
        associated: associatedID
    });
    try {
        yield newBondingAssociated.save();
        res.status(201).json({
            msg: 'Vinculacion realizada con exito',
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.addAssociatedToCompany = addAssociatedToCompany;
const getBondingAssociatedToCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const bonding = yield bondingAssociated_1.default.find({
        user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id
    });
    if (bonding.length === 0) {
        return res.status(200).json({
            msg: 'No cuentas con ningun asociado vinculado',
        });
    }
    let associates;
    try {
        associates = yield Promise.all(bonding.map(el => models_1.User.find({
            _id: el.associated
        })));
        res.status(200).json({
            msg: 'success',
            associates: associates.flat()
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.getBondingAssociatedToCompany = getBondingAssociatedToCompany;
const deleteBounding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { id } = req.params;
    const existAssociated = yield bondingAssociated_1.default.find({
        user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
        associated: id
    });
    if (existAssociated.length === 0) {
        return res.status(200).json({
            msg: 'Ya has eliminado este asociado o no se encuentra disponible',
        });
    }
    yield bondingAssociated_1.default.remove({ associated: id });
    res.status(200).json({
        msg: 'Asociado eliminado correctamente',
    });
});
exports.deleteBounding = deleteBounding;
