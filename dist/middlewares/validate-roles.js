"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRol = exports.isAdminRol = void 0;
const isAdminRol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Se necesita JWT'
        });
    }
    const { rol } = req.user;
    if (rol !== 'SUPER_ADMIN') {
        return res.status(400).json({
            msg: 'Esta acción necesita ser realizada por un SUPER ADMIN'
        });
    }
    next();
});
exports.isAdminRol = isAdminRol;
const hasRol = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //Validations) => {
        console.log(req.user);
        if (!req.user) {
            return res.status(500).json({
                msg: 'The role verification is without token'
            });
        }
        if (!roles.includes(req.user.rol)) {
            return res.status(500).json({
                msg: 'The role is not valid'
            });
        }
        next();
    });
};
exports.hasRol = hasRol;
