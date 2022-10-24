"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = exports.authRoutes = exports.userRoutes = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var category_1 = require("./category");
Object.defineProperty(exports, "categoryRoutes", { enumerable: true, get: function () { return __importDefault(category_1).default; } });
