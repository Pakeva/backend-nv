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
const ManualShippingSchema = new mongoose_1.Schema({
    destinationAddress: {
        zip: {
            type: Number,
            required: true,
        },
        colony: {
            type: String,
            required: true
        },
        municipality: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        numInt: {
            type: String,
        },
        numExt: {
            type: String,
            required: true
        },
        references: {
            type: String,
        },
    },
    packageDetails: {
        description: {
            type: String,
            required: true
        }
    },
    associated: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true
        },
        img: {
            type: String,
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
        },
    },
    company: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true
        },
        img: {
            type: String,
        },
        name: {
            type: String,
            required: [true, 'El nombre es requerido'],
        },
        zip: {
            type: Number,
            required: [true, 'El código postal es requerido'],
        },
        state: {
            type: String,
            required: [true, 'El estado es requerido'],
        },
        municipality: {
            type: String,
            required: [true, 'El municipio es requerido'],
        },
        colony: {
            type: String,
            required: [true, 'La colonia o fraccionamiento es requerido'],
        },
        street: {
            type: String,
            required: [true, 'La calle es requerida'],
        },
        numExt: {
            type: String,
            required: [true, 'La número exterior es requerido'],
        },
        numInt: {
            type: String,
        },
        references: {
            type: String,
        },
        phone: {
            type: Number,
        },
    },
    status: {
        type: String,
        enum: ['pending', 'on-course', 'completed', 'canceled', 'rejected'],
        default: "pending"
    }
});
ManualShippingSchema.set("timestamps", true);
ManualShippingSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, rest = __rest(_a, ["__v", "_id"]);
    //You know what it means
    return Object.assign({ id: _id }, rest);
};
exports.default = (0, mongoose_1.model)("ManualShipping", ManualShippingSchema);
