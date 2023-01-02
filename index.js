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
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
console.log(dotenv_1["default"].config());
var morgan_1 = require("morgan");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
// @ts-ignore
var express_fileupload_1 = require("express-fileupload");
// import {socketController} from './sockets'
// import responseTime from 'response-time'
var routes_1 = require("./routes");
var config_1 = require("./database/config");
var app = (0, express_1["default"])();
var port = process.env.PORT || 4100;
//DB CONNECTION.
var connectDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dbQa, dbProd, db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(process.env.NODE_ENV);
                dbQa = process.env.MONGO_DB_QA;
                dbProd = process.env.MONGO_DB_PROD;
                db = process.env.NODE_ENV === "development" ? dbQa : dbProd;
                return [4 /*yield*/, (0, config_1.connectDb)(db)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
connectDatabase().then(function (_) {
    console.log("Running DB");
});
//Middlewares
app.use(express_1["default"].json());
app.use(express_1["default"].static("public"));
app.use((0, morgan_1["default"])("tiny"));
app.use((0, cors_1["default"])());
app.use((0, helmet_1["default"])());
app.use((0, express_fileupload_1["default"])({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));
// app.use(responseTime())
//TODO rate-limit
//TODO error-handler
//Paths
var userPath = "/api/users";
var authPath = "/api/auth";
var categoryPath = "/api/categories";
var productsPath = "/api/products";
var bondingAssociated = "/api/b-associated";
var shippingPath = "/api/shipping";
var bindingPath = "/api/b-companies";
var uploadFilesPath = "/api/uploads";
var manualShippings = "/api/man-shippings";
var companiesPath = "/api/companies";
var usersShippingPath = "/api/user-shipping";
//Routes
app.use("".concat(userPath), routes_1.userRoutes);
app.use("".concat(authPath), routes_1.authRoutes);
app.use("".concat(categoryPath), routes_1.categoryRoutes);
app.use("".concat(productsPath), routes_1.productsRoutes);
app.use("".concat(bondingAssociated), routes_1.bondingAssociatedRoutes);
app.use("".concat(shippingPath), routes_1.shippingRoutes);
app.use("".concat(bindingPath), routes_1.bondingCompaniesRoutes);
app.use("".concat(uploadFilesPath), routes_1.uploadsRoutes);
app.use("".concat(manualShippings), routes_1.manualShippingRoutes);
app.use("".concat(companiesPath), routes_1.companyRoutes);
app.use("".concat(usersShippingPath), routes_1.userShippingRoutes);
//Sockets
var server = http_1["default"].createServer(app);
var io = new socket_io_1["default"].Server(server);
// http://localhost:4000/socket.io/socket.io.js for check the connection with the server
io.on("connection", function (socket) {
    // console.log('cliente conectado', socket.id);
    socket.on("disconnect", function () {
        console.log("cliente desconctado");
    });
    //TODO DELETE THIS
    // @ts-ignore
    socket.on("enviar-mensaje", function (payload) {
        console.log(payload);
        // TODO peticion base de datos
        // @ts-ignore
        io.emit("enviar-mensaje", payload);
    });
    // @ts-ignore
    socket.on("send-delivery-petition", function (payload) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(payload);
            // @ts-ignore
            io.emit("send-delivery-petition", payload);
            return [2 /*return*/];
        });
    }); });
    // @ts-ignore
    socket.on("send-user-shipping", function (payload) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(payload);
            // @ts-ignore
            io.emit("send-user-shipping", payload);
            return [2 /*return*/];
        });
    }); });
});
//Public api
app.get("/api", function (req, res) {
    res.json({ msg: "Hello world!" });
});
server.listen(port, function () {
    console.log("Server running in port ".concat(port));
});
