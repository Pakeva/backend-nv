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
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const config_1 = require("./database/config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4100;
//DB CONNECTION.
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, config_1.connectDb)();
});
connectDatabase().then(_ => {
    console.log('Running DB');
});
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)());
//Paths
const userPath = '/api/users';
const authPath = '/api/auth';
//Routes
app.use(`${userPath}`, routes_1.userRoutes);
app.use(`${authPath}`, routes_1.authRoutes);
app.get('/api', (req, res) => {
    res.json({ msg: 'Hello world!' });
});
app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
