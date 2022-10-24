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
const UserSchema = new mongoose_1.Schema({
    rol: {
        type: String,
        enum: ['SUPER_ADMIN', 'CLIENT', 'ASSOCIATED', 'FINAL_USER'],
        required: true
    },
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    firstLastName: {
        type: String,
        required: [true, 'El apellido paterno es requerido'],
    },
    secondLastName: {
        type: String,
    },
    birthday: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida']
    },
    genre: {
        type: String,
        enum: ['M', 'F', 'NB'],
        required: [true, 'El género paterno es requerido'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    email: {
        type: String,
        required: [true, 'El email paterno es requerido'],
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
        required: [true, 'El teléfono es requerido'],
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
});
UserSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id, state, password } = _a, user = __rest(_a, ["__v", "_id", "state", "password"]);
    // return category;
    //You know what it means
    return Object.assign({ id: _id }, user);
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
