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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteBounding = exports.getBondingAssociatedToCompany = exports.addAssociatedToCompany = void 0;
var helpers_1 = require("../helpers");
var bondingAssociated_1 = require("../models/bondingAssociated");
var models_1 = require("../models");
var addAssociatedToCompany = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var associatedID, associated, existsBondingAssociated, newBondingAssociated, e_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                associatedID = req.body.associatedID;
                console.log(associatedID);
                return [4 /*yield*/, models_1.User.findById(associatedID)];
            case 1:
                associated = _c.sent();
                if (!associated) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'El asociado fue eliminado o dado de baja'
                        })];
                }
                return [4 /*yield*/, bondingAssociated_1["default"].findOne({
                        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                        associated: associatedID
                    })];
            case 2:
                existsBondingAssociated = _c.sent();
                if (existsBondingAssociated) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'Ya esta vinculado este asociado'
                        })];
                }
                newBondingAssociated = new bondingAssociated_1["default"]({
                    user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
                    associated: associatedID
                });
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, newBondingAssociated.save()];
            case 4:
                _c.sent();
                res.status(201).json({
                    msg: 'Vinculacion realizada con exito'
                });
                return [3 /*break*/, 6];
            case 5:
                e_1 = _c.sent();
                (0, helpers_1.errorResponse)(e_1, res);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addAssociatedToCompany = addAssociatedToCompany;
var getBondingAssociatedToCompany = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bonding, associated, associateds, e_2, e_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, bondingAssociated_1["default"].find({
                    user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
                })];
            case 1:
                bonding = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, models_1.User.findById(bonding[0].associated)];
            case 3:
                associateds = _b.sent();
                if (associateds) {
                    return [2 /*return*/, res.status(200).json({
                            msg: 'Success',
                            //GET ALL ASOCIATEDs
                            associateds: associateds
                        })];
                }
                return [3 /*break*/, 5];
            case 4:
                e_2 = _b.sent();
                (0, helpers_1.errorResponse)(e_2, res);
                return [3 /*break*/, 5];
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, models_1.User.findById(bonding.associated)];
            case 6:
                // @ts-ignore
                associated = _b.sent();
                if (associated) {
                    return [2 /*return*/, res.status(200).json({
                            msg: 'Success',
                            //GET ALL ASOCIATEDs
                            associateds: associated
                        })];
                }
                return [3 /*break*/, 8];
            case 7:
                e_3 = _b.sent();
                (0, helpers_1.errorResponse)(e_3, res);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getBondingAssociatedToCompany = getBondingAssociatedToCompany;
var deleteBounding = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, bonding;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, bondingAssociated_1["default"].find({
                        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                        associated: id
                    })];
            case 1:
                bonding = _b.sent();
                return [4 /*yield*/, bondingAssociated_1["default"].remove({ category: id })];
            case 2:
                _b.sent();
                res.status(200).json({
                    msg: 'Asociado eliminado correctamente'
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteBounding = deleteBounding;