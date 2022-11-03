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
    console.log(associatedID);
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
    //TODO VALIDATION ASSOCIATED ROL TO BONDING
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
    //TODO GET ALL THE ASSOCIATEDS
    // const idAssociateds = bonding.map(bond => bond.associated);
    //Fix this
    const associated = yield models_1.User.findById(bonding.associated);
    const associateds = yield models_1.User.findById(bonding[0].associated);
    res.status(200).json({
        msg: 'Success',
        //GET ALL ASOCIATEDs
        associateds: associateds ? associateds : associated
    });
});
exports.getBondingAssociatedToCompany = getBondingAssociatedToCompany;
const deleteBounding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    //Todo fix this
    const { id } = req.params;
    const bonding = yield bondingAssociated_1.default.find({
        user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
        associated: id
    });
    yield bondingAssociated_1.default.remove({ category: id });
    res.status(200).json({
        msg: 'Asociado eliminado correctamente',
    });
});
exports.deleteBounding = deleteBounding;
