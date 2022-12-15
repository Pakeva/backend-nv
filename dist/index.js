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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require('dotenv').config({ path: __dirname + '/./../../.env' });
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
// @ts-ignore
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// import {socketController} from './sockets'
// import responseTime from 'response-time'
const routes_1 = require("./routes");
const config_1 = require("./database/config");
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = process.env.PORT || 4100;
//DB CONNECTION.
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV);
    const dbQa = process.env.MONGO_DB_QA;
    const dbProd = process.env.MONGO_DB_PROD;
    console.log({ dbQa });
    console.log({ dbProd });
    const db = process.env.NODE_ENV === 'development' ? dbQa : dbProd;
    console.log({ db });
    yield (0, config_1.connectDb)(db);
});
connectDatabase().then(_ => {
    console.log('Running DB');
});
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
// app.use(responseTime())
//TODO rate-limit
//TODO error-handler
//Paths
const userPath = '/api/users';
const authPath = '/api/auth';
const categoryPath = '/api/categories';
const productsPath = '/api/products';
const bondingAssociated = '/api/b-associated';
const shippingPath = '/api/shipping';
const bindingPath = '/api/b-companies';
const uploadFilesPath = '/api/uploads';
//Routes
app.use(`${userPath}`, routes_1.userRoutes);
app.use(`${authPath}`, routes_1.authRoutes);
app.use(`${categoryPath}`, routes_1.categoryRoutes);
app.use(`${productsPath}`, routes_1.productsRoutes);
app.use(`${bondingAssociated}`, routes_1.bondingAssociatedRoutes);
app.use(`${shippingPath}`, routes_1.shippingRoutes);
app.use(`${bindingPath}`, routes_1.bondingCompaniesRoutes);
app.use(`${uploadFilesPath}`, routes_1.uploadsRoutes);
//Sockets
const server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(server);
// http://localhost:4000/socket.io/socket.io.js for check the connection with the server
io.on("connection", (socket) => {
    // console.log('cliente conectado', socket.id);
    socket.on('disconnect', () => {
        console.log('cliente desconctado');
    });
    //TODO DELETE THIS
    // @ts-ignore
    socket.on('enviar-mensaje', (payload) => {
        console.log(payload);
        // TODO peticion base de datos
        // @ts-ignore
        io.emit('enviar-mensaje', payload);
    });
    // @ts-ignore
    socket.on('send-delivery-petition', (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const idAssociated = payload.associated.id;
        const associated = yield models_1.User.findById('6349a073f5a836a198d5646f');
        console.log(associated);
        console.log(payload);
        // @ts-ignore
        io.emit('send-delivery-petition', payload);
    }));
});
//Public api
app.get('/api', (req, res) => {
    res.json({ msg: 'Hello world!' });
});
server.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
