"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Category = exports.Rol = exports.User = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var rol_1 = require("./rol");
Object.defineProperty(exports, "Rol", { enumerable: true, get: function () { return __importDefault(rol_1).default; } });
var category_1 = require("./category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return __importDefault(category_1).default; } });
var products_1 = require("./products");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return __importDefault(products_1).default; } });
