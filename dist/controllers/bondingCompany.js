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
exports.deleteBoundingCompany = exports.getBondingCompaniesToUser = exports.addUserToCompany = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const bondingCompany_1 = __importDefault(require("../models/bondingCompany"));
const addUserToCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId } = req.body;
    console.log(companyId);
    // const company = await User.findById(companyId);
    //
    // if (!company) {
    //   return res.status(401).json({
    //     msg: 'La compania fue eliminada o dado de baja'
    //   })
    // }
    //
    // const existsBondingCompany = await BondingCompany.findOne({
    //   user: req.user?._id,
    //   company: companyId
    // })
    //
    // if (existsBondingCompany) {
    //   return res.status(401).json({
    //     msg: 'Ya esta vinculado esta compania'
    //   })
    // }
    //
    // const newBondingCompany = new BondingCompany({
    //   user: req.user?._id,
    //   company: companyId
    // })
    //
    // //TODO VALIDATION COMPANY ROL TO BONDING
    // try {
    //   await newBondingCompany.save();
    //
    //   res.status(201).json({
    //     msg: 'Vinculacion realizada con exito',
    //   })
    // } catch (e) {
    //   errorResponse(e, res)
    // }
});
exports.addUserToCompany = addUserToCompany;
const getBondingCompaniesToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bonding = yield bondingCompany_1.default.find({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
    });
    if (bonding.length === 0) {
        return res.status(200).json({
            msg: 'No cuentas con ninguna compania vinculada',
        });
    }
    let companies;
    try {
        companies = yield Promise.all(bonding.map(el => models_1.User.find({
            _id: el.company
        })));
        res.status(200).json({
            msg: 'success',
            companies: companies.flat()
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.getBondingCompaniesToUser = getBondingCompaniesToUser;
const deleteBoundingCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log('aaa');
    const { id } = req.params;
    const existCompany = yield bondingCompany_1.default.find({
        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
        company: id
    });
    if (existCompany.length === 0) {
        return res.status(200).json({
            msg: 'Ya has eliminado esta compania o no se encuentra disponible',
        });
    }
    yield bondingCompany_1.default.remove({ company: id });
    res.status(200).json({
        msg: 'Compania eliminada correctamente',
    });
});
exports.deleteBoundingCompany = deleteBoundingCompany;
