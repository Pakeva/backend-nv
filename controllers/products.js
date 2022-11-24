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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProductsByCategoryId = void 0;
var models_1 = require("../models");
var helpers_1 = require("../helpers");
var getProductsByCategoryId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var catId, products, prodFiltered, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                catId = req.params.catId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Product.find({
                        category: catId
                    }).populate('user', { name: 1 })];
            case 2:
                products = _a.sent();
                prodFiltered = products.filter(function (prod) { return prod.status; });
                res.status(200).json({
                    msg: 'Success',
                    totalProducts: prodFiltered.length,
                    products: prodFiltered
                });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                (0, helpers_1.errorResponse)(e_1, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProductsByCategoryId = getProductsByCategoryId;
var getProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Product.findById(id).populate('category', { name: 1 })];
            case 2:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(400).json({
                            msg: 'Producto no encontrado'
                        })];
                }
                if (!product.status) {
                    return [2 /*return*/, res.status(400).json({
                            msg: 'Producto actualmente eliminado'
                        })];
                }
                res.status(200).json({
                    msg: 'Success',
                    product: product
                });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                (0, helpers_1.errorResponse)(e_2, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProduct = getProduct;
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, product, productDb, newProduct, e_3;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, product = __rest(_a, ["name"]);
                return [4 /*yield*/, models_1.Product.findOne({ name: name })];
            case 1:
                productDb = _c.sent();
                if (productDb && productDb.status) {
                    return [2 /*return*/, res.status(400).json({
                            msg: 'Este producto ya está registrado'
                        })];
                }
                newProduct = new models_1.Product(__assign(__assign({ name: name }, product), { user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id }));
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                return [4 /*yield*/, newProduct.save()];
            case 3:
                _c.sent();
                res.status(201).json({
                    msg: 'Producto creado con éxito',
                    product: newProduct
                });
                return [3 /*break*/, 5];
            case 4:
                e_3 = _c.sent();
                (0, helpers_1.errorResponse)(e_3, res);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
var updateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, description, prod, productDB, productUpdated, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, description = _a.description, prod = __rest(_a, ["name", "description"]);
                return [4 /*yield*/, models_1.Product.findOne({ name: name })
                    //TODO verify if the product name is already in the database
                    // if (productDB && productDB.status) {
                    //     return res.status(400).json({
                    //         msg: 'Este producto ya esta registrado'
                    //     })
                    // }
                ];
            case 1:
                productDB = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, models_1.Product.findByIdAndUpdate(id, __assign({ name: name, description: description && description }, prod), { "new": true })];
            case 3:
                productUpdated = _b.sent();
                res.status(200).json({
                    msg: 'Success',
                    productUpdated: productUpdated
                });
                return [3 /*break*/, 5];
            case 4:
                e_4 = _b.sent();
                (0, helpers_1.errorResponse)(e_4, res);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateProduct = updateProduct;
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, productIsActive, productDeleted, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, models_1.Product.findById(id)];
            case 1:
                productIsActive = _a.sent();
                if (!productIsActive.status) {
                    return [2 /*return*/, res.status(400).json({
                            msg: 'Producto ya eliminado anteriormente'
                        })];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, models_1.Product.findByIdAndUpdate(id, {
                        status: false
                    }, { "new": true })];
            case 3:
                productDeleted = _a.sent();
                res.status(200).json({
                    msg: 'Producto eliminado correctamente',
                    product: {
                        name: productDeleted.name,
                        status: productDeleted.status
                    }
                });
                return [3 /*break*/, 5];
            case 4:
                e_5 = _a.sent();
                (0, helpers_1.errorResponse)(e_5, res);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
