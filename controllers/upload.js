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
exports.getImage = exports.updateImage = void 0;
var models_1 = require("../models");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var cloudinary_1 = require("cloudinary");
var cloudinary = cloudinary_1["default"].v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'dij7fdpqo',
    api_key: process.env.CLOUD_API_KEY || '572311711498636',
    api_secret: process.env.CLOUD_API_SECRET || 'LaSwyBzVjJVJcMur4wPia54vGe8'
});
var updateImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, collection, model, _b, nameArr, name_1, public_id, tempFilePath, secure_url;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, id = _a.id, collection = _a.collection;
                _b = collection;
                switch (_b) {
                    case "users": return [3 /*break*/, 1];
                    case "categories": return [3 /*break*/, 3];
                    case "products": return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 1: return [4 /*yield*/, models_1.User.findById(id)];
            case 2:
                model = _c.sent();
                if (!model) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un usuario con el id establecido"
                        })];
                }
                return [3 /*break*/, 8];
            case 3: return [4 /*yield*/, models_1.Category.findById(id)];
            case 4:
                model = _c.sent();
                if (!model) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe una categoria con el id establecido"
                        })];
                }
                return [3 /*break*/, 8];
            case 5: return [4 /*yield*/, models_1.Product.findById(id)];
            case 6:
                model = _c.sent();
                if (!model) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un producto con el id establecido"
                        })];
                }
                return [3 /*break*/, 8];
            case 7: return [2 /*return*/, res.status(500).json({ msg: "We need implement this case" })];
            case 8:
                if (!model.img) return [3 /*break*/, 10];
                nameArr = model.img.split('/');
                name_1 = nameArr[nameArr.length - 1];
                public_id = name_1.split('.')[0];
                return [4 /*yield*/, cloudinary.uploader.destroy(public_id)];
            case 9:
                _c.sent();
                _c.label = 10;
            case 10:
                tempFilePath = req.files.archivo.tempFilePath;
                return [4 /*yield*/, cloudinary.uploader.upload(tempFilePath)];
            case 11:
                secure_url = (_c.sent()).secure_url;
                model.img = secure_url;
                return [4 /*yield*/, model.save()];
            case 12:
                _c.sent();
                res.status(200).json({
                    msg: "success",
                    url: secure_url
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateImage = updateImage;
var getImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, collection, model, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, id = _a.id, collection = _a.collection;
                _b = collection;
                switch (_b) {
                    case "users": return [3 /*break*/, 1];
                    case "categories": return [3 /*break*/, 3];
                    case "products": return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 1: return [4 /*yield*/, models_1.User.findById(id)];
            case 2:
                model = _c.sent();
                if (!model) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un usuario con el id establecido"
                        })];
                }
                return [3 /*break*/, 8];
            case 3: return [4 /*yield*/, models_1.Category.findById(id)];
            case 4:
                model = _c.sent();
                if (!model) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe una categoria con el id establecido"
                        })];
                }
                return [3 /*break*/, 8];
            case 5: return [4 /*yield*/, models_1.Product.findById(id)];
            case 6:
                model = _c.sent();
                if (!model) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "No existe un producto con el id establecido"
                        })];
                }
                return [3 /*break*/, 8];
            case 7: return [2 /*return*/, res.status(500).json({ msg: "We need implement this case" })];
            case 8:
                res.json({ msg: "success" });
                return [2 /*return*/];
        }
    });
}); };
exports.getImage = getImage;
