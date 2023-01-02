"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userShippingRoutes = exports.companyRoutes = exports.manualShippingRoutes = exports.uploadsRoutes = exports.bondingCompaniesRoutes = exports.shippingRoutes = exports.bondingAssociatedRoutes = exports.productsRoutes = exports.categoryRoutes = exports.authRoutes = exports.userRoutes = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var category_1 = require("./category");
Object.defineProperty(exports, "categoryRoutes", { enumerable: true, get: function () { return __importDefault(category_1).default; } });
var product_1 = require("./product");
Object.defineProperty(exports, "productsRoutes", { enumerable: true, get: function () { return __importDefault(product_1).default; } });
var bondingAssociated_1 = require("./bondingAssociated");
Object.defineProperty(exports, "bondingAssociatedRoutes", { enumerable: true, get: function () { return __importDefault(bondingAssociated_1).default; } });
var shipping_1 = require("./shipping");
Object.defineProperty(exports, "shippingRoutes", { enumerable: true, get: function () { return __importDefault(shipping_1).default; } });
var bondingCompany_1 = require("./bondingCompany");
Object.defineProperty(exports, "bondingCompaniesRoutes", { enumerable: true, get: function () { return __importDefault(bondingCompany_1).default; } });
var uploads_1 = require("./uploads");
Object.defineProperty(exports, "uploadsRoutes", { enumerable: true, get: function () { return __importDefault(uploads_1).default; } });
var manualShipping_1 = require("./manualShipping");
Object.defineProperty(exports, "manualShippingRoutes", { enumerable: true, get: function () { return __importDefault(manualShipping_1).default; } });
var company_1 = require("./company");
Object.defineProperty(exports, "companyRoutes", { enumerable: true, get: function () { return __importDefault(company_1).default; } });
var userShipping_1 = require("./userShipping");
Object.defineProperty(exports, "userShippingRoutes", { enumerable: true, get: function () { return __importDefault(userShipping_1).default; } });
