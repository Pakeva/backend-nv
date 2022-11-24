"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.bondingCompaniesRoutes = exports.shippingRoutes = exports.bondingAssociatedRoutes = exports.productsRoutes = exports.categoryRoutes = exports.authRoutes = exports.userRoutes = void 0;
var user_1 = require("./user");
__createBinding(exports, user_1, "default", "userRoutes");
var auth_1 = require("./auth");
__createBinding(exports, auth_1, "default", "authRoutes");
var category_1 = require("./category");
__createBinding(exports, category_1, "default", "categoryRoutes");
var product_1 = require("./product");
__createBinding(exports, product_1, "default", "productsRoutes");
var bondingAssociated_1 = require("./bondingAssociated");
__createBinding(exports, bondingAssociated_1, "default", "bondingAssociatedRoutes");
var shipping_1 = require("./shipping");
__createBinding(exports, shipping_1, "default", "shippingRoutes");
var bondingCompany_1 = require("./bondingCompany");
__createBinding(exports, bondingCompany_1, "default", "bondingCompaniesRoutes");
