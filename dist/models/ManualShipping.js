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
            required: true
        },
        numExt: {
            type: String
        },
        references: {
            type: String,
        }
    },
    packageDetails: {
        description: {
            type: String,
            required: true
        }
    },
    company: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
        }
    }
});
ManualShippingSchema.set('timestamps', true);
ManualShippingSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, rest = __rest(_a, ["__v", "_id"]);
    //You know what it means
    return Object.assign({ id: _id }, rest);
};
exports.default = (0, mongoose_1.model)('ManualShipping', ManualShippingSchema);
