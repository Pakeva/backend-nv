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
exports.getAllCompaniesShippings = exports.getCompanyInfo = exports.updateCompanyInfo = exports.setInitialCompanyInfo = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const setInitialCompanyInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const user = yield models_1.User.findById(id);
    const existCompanyInfo = yield models_1.Company.find({
        user: id
    });
    console.log(existCompanyInfo);
    if (existCompanyInfo.length) {
        return res.status(201).json({
            msg: 'mal uso de peticion',
        });
    }
    if (!user) {
        return res.status(200).json({
            msg: 'Al perecer tu cuenta no esta activa'
        });
    }
    const company = new models_1.Company({
        user: id,
        name: req.body.name,
        description: req.body.description
    });
    try {
        yield company.save();
        return res.status(201).json({
            msg: 'datos guardados correctamente',
            company
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.setInitialCompanyInfo = setInitialCompanyInfo;
const updateCompanyInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const company = yield models_1.Company.findByIdAndUpdate(id, Object.assign({}, req.body));
    if (!company) {
        return res.status(200).json({
            msg: 'Al perecer tu cuenta de companias no esta activa'
        });
    }
    return res.status(200).json({
        msg: 'datos actualizados correctamente'
    });
});
exports.updateCompanyInfo = updateCompanyInfo;
const getCompanyInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const company = yield models_1.Company.findOne({
        user: id
    });
    if (!company) {
        return res.status(200).json({
            msg: 'Al perecer tu cuenta de companias no esta activa'
        });
    }
    return res.status(200).json({
        company
    });
});
exports.getCompanyInfo = getCompanyInfo;
const getAllCompaniesShippings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const manualShippings = yield models_1.ManualShipping.find({
        'company.id': id
    });
    const usersShippings = yield models_1.UserShipping.find({
        'company': id
    }).populate('user', { name: 1, firstLastName: 1, phone: 1,
        street: 1, numInt: 1, numExt: 1, colony: 1, municipality: 1, state: 1
    });
    const totalShippings = manualShippings.length + usersShippings.length;
    return res.status(200).json({
        totalShippings,
        manualShippings: {
            amount: manualShippings.length,
            manualShippings,
        },
        usersShippings: {
            amount: usersShippings.length,
            usersShippings
        }
    });
});
exports.getAllCompaniesShippings = getAllCompaniesShippings;
