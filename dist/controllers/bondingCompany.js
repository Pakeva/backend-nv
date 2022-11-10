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
exports.getBondingCompaniesToUser = exports.addUserToCompany = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const bondingCompany_1 = __importDefault(require("../models/bondingCompany"));
const addUserToCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { companyId } = req.body;
    console.log(companyId);
    const company = yield models_1.User.findById(companyId);
    if (!company) {
        return res.status(401).json({
            msg: 'La compania fue eliminada o dado de baja'
        });
    }
    const existsBondingCompany = yield bondingCompany_1.default.findOne({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        company: companyId
    });
    if (existsBondingCompany) {
        return res.status(401).json({
            msg: 'Ya esta vinculado esta compania'
        });
    }
    const newBondingCompany = new bondingCompany_1.default({
        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
        company: companyId
    });
    //TODO VALIDATION COMPANY ROL TO BONDING
    try {
        yield newBondingCompany.save();
        res.status(201).json({
            msg: 'Vinculacion realizada con exito',
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.addUserToCompany = addUserToCompany;
const getBondingCompaniesToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const bonding = yield bondingCompany_1.default.find({
        user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id
    });
    //TODO GET ALL THE COMPANIES
    // const idAssociateds = bonding.map(bond => bond.associated);
    //Fix this
    let company, companies;
    try {
        companies = yield models_1.User.findById(bonding[0].company);
        if (companies) {
            return res.status(200).json({
                msg: 'Success',
                //GET ALL ASOCIATEDs
                companies: companies
            });
        }
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
    try {
        // @ts-ignore
        company = yield models_1.User.findById(bonding.company);
        if (company) {
            return res.status(200).json({
                msg: 'Success',
                //GET ALL ASOCIATEDs
                companies: company
            });
        }
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.getBondingCompaniesToUser = getBondingCompaniesToUser;
