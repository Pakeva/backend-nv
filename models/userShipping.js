"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserShippingSchema = new mongoose_1.Schema({
    products: {
        type: Array,
        required: [true, 'The products are required']
    },
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
UserShippingSchema.set("timestamps", true);
UserShippingSchema.methods.toJSON = function () {
    var _a = this.toObject(), __v = _a.__v, _id = _a._id, rest = __rest(_a, ["__v", "_id"]);
    //You know what it means
    return __assign({ id: _id }, rest);
};
exports["default"] = (0, mongoose_1.model)("UserShipping", UserShippingSchema);
