"use strict";
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
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'the name is required']
    },
    description: { type: String },
    price: {
        type: Number,
        required: [true, 'the price is required']
    },
    amount: { type: Number },
    available: {
        type: Boolean,
        // trim: true,
        default: true,
        required: [true, 'the availability is required']
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});
ProductSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, prod = __rest(_a, ["__v", "_id"]);
    return Object.assign({ id: _id }, prod);
};
exports.default = (0, mongoose_1.model)('Product', ProductSchema);
