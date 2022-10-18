"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4100;
//DB - Initialized in each petition.
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
