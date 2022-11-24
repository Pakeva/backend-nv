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
exports.Shipping = exports.Product = exports.Category = exports.Rol = exports.User = void 0;
var user_1 = require("./user");
__createBinding(exports, user_1, "default", "User");
var rol_1 = require("./rol");
__createBinding(exports, rol_1, "default", "Rol");
var category_1 = require("./category");
__createBinding(exports, category_1, "default", "Category");
var products_1 = require("./products");
__createBinding(exports, products_1, "default", "Product");
var shipping_1 = require("./shipping");
__createBinding(exports, shipping_1, "default", "Shipping");
