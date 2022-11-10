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
exports.bindCompanyToUser = void 0;
const models_1 = require("../models");
const bindCompanyToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || '';
    const { bondingCode } = req.body;
    const company = yield models_1.User.find({ bondingCode });
    if (!company) {
        return res.status(401).json({
            msg: 'Codigo no valido, no hay coincidencias'
        });
    }
    // const existsBondingAssociated = await BondingAssociated.findOne({
    //   user: req.user?._id,
    //   associated: associatedID
    // })
    //
    // if (existsBondingAssociated) {
    //   return res.status(401).json({
    //     msg: 'Ya esta vinculado este asociado'
    //   })
    // }
    //
    // const newBondingAssociated = new BondingAssociated({
    //   user: req.user?._id,
    //   associated: associatedID
    // })
    //
    // //TODO VALIDATION ASSOCIATED ROL TO BONDING
    // try {
    //   await newBondingAssociated.save();
    //
    //   res.status(201).json({
    //     msg: 'Vinculacion realizada con exito',
    //   })
    // } catch (e) {
    //   errorResponse(e, res)
    // }
    res.status(200).json({
        msg: 'Success',
        company
    });
});
exports.bindCompanyToUser = bindCompanyToUser;
