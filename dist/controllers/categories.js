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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = exports.getCategory = exports.getCategories = exports.deleteCategory = exports.createCategory = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield models_1.Category.find();
        const catFiltered = categories.filter(cat => cat.status);
        res.status(200).json({
            msg: 'Success',
            totalCategories: catFiltered.length,
            categories: catFiltered
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield models_1.Category.findById(id).populate('user', { name: 1, email: 1 });
        if (!category) {
            return res.status(400).json({
                msg: 'Categoría no encontrada'
            });
        }
        if (!category.status) {
            return res.status(400).json({
                msg: 'Categoría actualmente eliminada'
            });
        }
        res.status(200).json({
            msg: 'Success',
            category,
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, description } = req.body;
    const categoryDB = yield models_1.Category.findOne({ name: name.toUpperCase() });
    const amountCategories = yield models_1.Category.find({ status: true }).countDocuments();
    if (amountCategories >= 5) {
        return res.status(400).json({
            msg: 'No puedes tener más de 5 categorías'
        });
    }
    const newCategory = new models_1.Category({
        name: name.toUpperCase(),
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        description
    });
    if (categoryDB && categoryDB.status) {
        return res.status(400).json({
            msg: 'La categoría ya esta registrada'
        });
    }
    try {
        yield newCategory.save();
        res.status(200).json({
            msg: 'Categoría creada correctamente',
            category: newCategory
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { name, description } = _b, cat = __rest(_b, ["name", "description"]);
    const categoryDB = yield models_1.Category.findOne({ name: name.toUpperCase() });
    if (categoryDB) {
        return res.status(400).json({
            msg: 'Esta categoría ya esta registrada'
        });
    }
    try {
        const categoryUpdated = yield models_1.Category.findByIdAndUpdate(id, Object.assign({ name: name.toUpperCase(), description: description && description }, cat), { new: true });
        res.status(200).json({
            msg: 'Success',
            categoryUpdated
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoryIsActive = yield models_1.Category.findById(id);
    if (!categoryIsActive.status) {
        return res.status(400).json({
            msg: 'Categoría ya eliminada anteriormente'
        });
    }
    try {
        const categoryDeleted = yield models_1.Category.findByIdAndUpdate(id, {
            status: false,
        }, { new: true });
        yield models_1.Product.remove({ category: id });
        res.status(200).json({
            msg: 'Categoría eliminada correctamente',
            category: {
                name: categoryDeleted.name,
                status: categoryDeleted.status
            }
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.deleteCategory = deleteCategory;
