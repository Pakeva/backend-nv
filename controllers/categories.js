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
exports.updateCategory = exports.getCategory = exports.getCategories = exports.deleteCategory = exports.createCategory = void 0;
var models_1 = require("../models");
var helpers_1 = require("../helpers");
var getCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories, catFiltered, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.Category.find()];
            case 1:
                categories = _a.sent();
                catFiltered = categories.filter(function (cat) { return cat.status; });
                res.status(200).json({
                    msg: 'Success',
                    totalCategories: catFiltered.length,
                    categories: catFiltered
                });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                (0, helpers_1.errorResponse)(e_1, res);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCategories = getCategories;
var getCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, category, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Category.findById(id).populate('user', { name: 1, email: 1 })];
            case 2:
                category = _a.sent();
                if (!category) {
                    return [2 /*return*/, res.status(400).json({
                            msg: 'Categoría no encontrada'
                        })];
                }
                if (!category.status) {
                    return [2 /*return*/, res.status(400).json({
                            msg: 'Categoría actualmente eliminada'
                        })];
                }
                res.status(200).json({
                    msg: 'Success',
                    category: category
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
exports.getCategory = getCategory;
var createCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, categoryDB, amountCategories, newCategory, e_3;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description;
                return [4 /*yield*/, models_1.Category.findOne({ name: name.toUpperCase() })];
            case 1:
                categoryDB = _c.sent();
                return [4 /*yield*/, models_1.Category.find({ status: true }).countDocuments()];
            case 2:
                amountCategories = _c.sent();
                if (amountCategories >= 5) {
                    return [2 /*return*/, res.status(400).json({
                            msg: 'No puedes tener más de 5 categorías'
                        })];
                }
                newCategory = new models_1.Category({
                    name: name.toUpperCase(),
                    user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
                    description: description
                });
                if (categoryDB && categoryDB.status) {
                    return [2 /*return*/, res.status(400).json({
                            msg: 'La categoría ya esta registrada'
                        })];
                }
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, newCategory.save()];
            case 4:
                _c.sent();
                res.status(200).json({
                    msg: 'Categoría creada correctamente',
                    category: newCategory
                });
                return [3 /*break*/, 6];
            case 5:
                e_3 = _c.sent();
                (0, helpers_1.errorResponse)(e_3, res);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createCategory = createCategory;
var updateCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, description, cat, categoryDB, categoryUpdated, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, description = _a.description, cat = __rest(_a, ["name", "description"]);
                return [4 /*yield*/, models_1.Category.findOne({ name: name.toUpperCase() })];
            case 1:
                categoryDB = _b.sent();
                if (categoryDB) {
                    return [2 /*return*/, res.status(400).json({
                            msg: 'Esta categoría ya esta registrada'
                        })];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, models_1.Category.findByIdAndUpdate(id, __assign({ name: name.toUpperCase(), description: description && description }, cat), { "new": true })];
            case 3:
                categoryUpdated = _b.sent();
                res.status(200).json({
                    msg: 'Success',
                    categoryUpdated: categoryUpdated
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
exports.updateCategory = updateCategory;
var deleteCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, categoryIsActive, categoryDeleted, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, models_1.Category.findById(id)];
            case 1:
                categoryIsActive = _a.sent();
                if (!categoryIsActive.status) {
                    return [2 /*return*/, res.status(400).json({
                            msg: 'Categoría ya eliminada anteriormente'
                        })];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, models_1.Category.findByIdAndUpdate(id, {
                        status: false
                    }, { "new": true })];
            case 3:
                categoryDeleted = _a.sent();
                return [4 /*yield*/, models_1.Product.remove({ category: id })];
            case 4:
                _a.sent();
                res.status(200).json({
                    msg: 'Categoría eliminada correctamente',
                    category: {
                        name: categoryDeleted.name,
                        status: categoryDeleted.status
                    }
                });
                return [3 /*break*/, 6];
            case 5:
                e_5 = _a.sent();
                (0, helpers_1.errorResponse)(e_5, res);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteCategory = deleteCategory;
