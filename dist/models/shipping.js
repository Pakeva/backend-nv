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
const ShippingSchema = new mongoose_1.Schema({
    origin: {
        name: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        int_number: {
            type: String,
        },
        district: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            default: "MX"
        },
        reference: {
            type: String,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: Number,
            required: true,
        },
    },
    destination: {
        name: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        int_number: {
            type: String,
        },
        district: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            default: "MX"
        },
        reference: {
            type: String,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: Number,
            required: true,
        },
    },
    package: {
        weight: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        width: {
            type: Number,
            required: true,
        },
        length: {
            type: Number,
            required: true,
        },
        declaredValue: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    shipment: {
        ObjectId: {
            type: String,
            required: true,
        },
        ShippingId: {
            type: String,
            required: true,
        },
        carrier: {
            type: String,
            required: true,
        },
        service: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        insurance: {
            type: Number,
        },
        currency: {
            type: String,
            default: "MXN"
        },
        days: {
            type: String,
            required: true,
        },
        extra: {
            type: String,
            required: true,
        },
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
ShippingSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, rest = __rest(_a, ["__v", "_id"]);
    // return category;
    //You know what it means
    return Object.assign({ id: _id }, rest);
};
exports.default = (0, mongoose_1.model)('Shipping', ShippingSchema);
