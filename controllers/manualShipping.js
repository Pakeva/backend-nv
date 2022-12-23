"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
exports.addNewShipping = exports.updateShippingStatus = exports.getAllShippings = exports.getShipping = void 0;
var helpers_1 = require("../helpers");
var models_1 = require("../models");
var manualShipping_1 = require("../models/manualShipping");
var ENUM_STATUS = ['pending', 'on-course', 'completed', 'canceled', 'rejected'];
var getShipping = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, shipping;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, manualShipping_1["default"].findById(id)];
            case 1:
                shipping = _a.sent();
                if (!shipping) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "No existe el envio consultado"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        shipping: shipping
                    })];
        }
    });
}); };
exports.getShipping = getShipping;
var updateShippingStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status, shipping;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                status = req.body.status.toLowerCase();
                if (!ENUM_STATUS.includes(status)) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "No es un status valido"
                        })];
                }
                return [4 /*yield*/, manualShipping_1["default"].findByIdAndUpdate(id, {
                        status: status
                    }, { "new": true })];
            case 1:
                shipping = _a.sent();
                if (!shipping) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "No existe el envio consultado"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        shipping: shipping
                    })];
        }
    });
}); };
exports.updateShippingStatus = updateShippingStatus;
var getAllShippings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, shippingsCompany, shippingsAssociated;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!(((_b = req.user) === null || _b === void 0 ? void 0 : _b.rol) === 'CLIENT')) return [3 /*break*/, 2];
                return [4 /*yield*/, manualShipping_1["default"].find({
                        "company.id": id
                    })];
            case 1:
                shippingsCompany = _d.sent();
                if (!shippingsCompany.length) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "No cuentas con envios realizados"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        shippingsCompany: shippingsCompany
                    })];
            case 2:
                if (!(((_c = req.user) === null || _c === void 0 ? void 0 : _c.rol) === 'ASSOCIATED')) return [3 /*break*/, 4];
                return [4 /*yield*/, manualShipping_1["default"].find({
                        "associated.id": id
                    })];
            case 3:
                shippingsAssociated = _d.sent();
                if (!shippingsAssociated.length) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "No cuentas con envios realizados"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        shippingsAssociated: shippingsAssociated
                    })];
            case 4: return [2 /*return*/, res.status(200).json({
                    msg: 'Al parecer no cuentas con envios realizados'
                })];
        }
    });
}); };
exports.getAllShippings = getAllShippings;
var addNewShipping = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var company, shipping, associated, newShipping, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                company = req.user;
                if (!company) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Al parecer no tienes activa tu sesion"
                        })];
                }
                shipping = req.body;
                if (!shipping) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Es necesaria la informacion del envio"
                        })];
                }
                return [4 /*yield*/, models_1.User.findById(shipping.associated)];
            case 1:
                associated = _a.sent();
                if (!associated) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "El asociado/repartidor no esta registrado o ha sido dado de baja"
                        })];
                }
                newShipping = new manualShipping_1["default"]({
                    destinationAddress: __assign({}, shipping.destinationAddress),
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
                        phone: company.phone
                    }
                });
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, newShipping.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        msg: "Envio realizado con exito",
                        shipping: {
                            id: newShipping.id,
                            originAddress: newShipping.company,
                            associated: newShipping.associated,
                            destinationAddress: newShipping.destinationAddress,
                            packageDetails: newShipping.packageDetails
                        }
                    })];
            case 4:
                e_1 = _a.sent();
                (0, helpers_1.errorResponse)(e_1, res);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addNewShipping = addNewShipping;
