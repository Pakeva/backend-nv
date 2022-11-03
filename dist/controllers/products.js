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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProductsByCategoryId = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const getProductsByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { catId } = req.params;
    try {
        const products = yield models_1.Product.find({
            category: catId
        }).populate('user', { name: 1 });
        const prodFiltered = products.filter(prod => prod.status);
        res.status(200).json({
            msg: 'Success',
            totalProducts: prodFiltered.length,
            products: prodFiltered
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.getProductsByCategoryId = getProductsByCategoryId;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield models_1.Product.findById(id).populate('category', { name: 1 });
        if (!product) {
            return res.status(400).json({
                msg: 'Producto no encontrado'
            });
        }
        if (!product.status) {
            return res.status(400).json({
                msg: 'Producto actualmente eliminado'
            });
        }
        res.status(200).json({
            msg: 'Success',
            product,
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _b = req.body, { name } = _b, product = __rest(_b, ["name"]);
    const productDb = yield models_1.Product.findOne({ name });
    if (productDb && productDb.status) {
        return res.status(400).json({
            msg: 'Este producto ya está registrado'
        });
    }
    const newProduct = new models_1.Product(Object.assign(Object.assign({ name }, product), { user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }));
    try {
        yield newProduct.save();
        res.status(201).json({
            msg: 'Producto creado con éxito',
            product: newProduct
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _c = req.body, { name, description } = _c, prod = __rest(_c, ["name", "description"]);
    const productDB = yield models_1.Product.findOne({ name });
    //TODO verify if the product name is already in the database
    // if (productDB && productDB.status) {
    //     return res.status(400).json({
    //         msg: 'Este producto ya esta registrado'
    //     })
    // }
    try {
        const productUpdated = yield models_1.Product.findByIdAndUpdate(id, Object.assign({ name, description: description && description }, prod), { new: true });
        res.status(200).json({
            msg: 'Success',
            productUpdated
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productIsActive = yield models_1.Product.findById(id);
    if (!productIsActive.status) {
        return res.status(400).json({
            msg: 'Producto ya eliminado anteriormente'
        });
    }
    try {
        const productDeleted = yield models_1.Product.findByIdAndUpdate(id, {
            status: false,
        }, { new: true });
        res.status(200).json({
            msg: 'Producto eliminado correctamente',
            product: {
                name: productDeleted.name,
                status: productDeleted.status
            }
        });
    }
    catch (e) {
        (0, helpers_1.errorResponse)(e, res);
    }
});
exports.deleteProduct = deleteProduct;
