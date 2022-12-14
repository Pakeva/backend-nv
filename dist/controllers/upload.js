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
exports.getImage = exports.updateImage = void 0;
const models_1 = require("../models");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'dij7fdpqo',
    api_key: process.env.CLOUD_API_KEY || '572311711498636',
    api_secret: process.env.CLOUD_API_SECRET || 'LaSwyBzVjJVJcMur4wPia54vGe8'
});
const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, collection } = req.params;
    let model;
    switch (collection) {
        case "users":
            model = yield models_1.User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "No existe un usuario con el id establecido"
                });
            }
            break;
        case "categories":
            model = yield models_1.Category.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "No existe una categoria con el id establecido"
                });
            }
            break;
        case "products":
            model = yield models_1.Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "No existe un producto con el id establecido"
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "We need implement this case" });
    }
    if (model.img) {
        // @ts-ignore
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        yield cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = yield cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;
    yield model.save();
    res.status(200).json({
        msg: "success",
        url: secure_url
    });
});
exports.updateImage = updateImage;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, collection } = req.params;
    let model;
    switch (collection) {
        case "users":
            model = yield models_1.User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "No existe un usuario con el id establecido"
                });
            }
            break;
        case "categories":
            model = yield models_1.Category.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "No existe una categoria con el id establecido"
                });
            }
            break;
        case "products":
            model = yield models_1.Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: "No existe un producto con el id establecido"
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "We need implement this case" });
    }
    res.json({ msg: "success" });
});
exports.getImage = getImage;
