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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.getUserByBondingCode = exports.deleteUser = exports.getUser = exports.getUsers = exports.updateUser = exports.createUser = void 0;
var helpers_1 = require("../helpers");
var models_1 = require("../models");
var randomstring_1 = require("randomstring");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                user = new models_1.User(__assign({}, body));
                user.password = (0, helpers_1.hashPassword)(user.password);
                user.bondingCode = randomstring_1["default"].generate(5);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.status(201).json({
                    msg: 'Usuario creado correctamente',
                    user: user
                });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                (0, helpers_1.errorResponse)(e_1, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, email, rol, user, userUpdated, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, email = _a.email, rol = _a.rol, user = __rest(_a, ["email", "rol"]);
                if (user.password) {
                    user.password = (0, helpers_1.hashPassword)(user.password);
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.User.findByIdAndUpdate(id, user, { "new": true })];
            case 2:
                userUpdated = _b.sent();
                res.status(200).json({
                    msg: 'Usuario actualizado correctamente',
                    user: __assign(__assign({}, user), { password: '' })
                });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                (0, helpers_1.errorResponse)(e_2, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.User.find()];
            case 1:
                users = _a.sent();
                res.status(200).json({
                    msg: 'success',
                    users: users
                });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                (0, helpers_1.errorResponse)(e_3, res);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.User.findById(id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            msg: 'El usuario no está registrado'
                        })];
                }
                res.status(200).json({
                    user: user
                });
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                (0, helpers_1.errorResponse)(e_4, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.User.findByIdAndUpdate(id, { status: false })];
            case 2:
                _a.sent();
                res.status(200).json({
                    msg: 'El usuario ha sido eliminado'
                });
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                (0, helpers_1.errorResponse)(e_5, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var getUserByBondingCode = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bc, userByBondingCode, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bc = req.params.bc;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.User.findOne({ bondingCode: bc })];
            case 2:
                userByBondingCode = _a.sent();
                console.log(userByBondingCode);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                (0, helpers_1.errorResponse)(e_6, res);
                return [3 /*break*/, 4];
            case 4:
                res.status(200).json({
                    msg: 'Success',
                    user: userByBondingCode
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getUserByBondingCode = getUserByBondingCode;
