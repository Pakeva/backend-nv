import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import cors from 'cors'
import helmet from "helmet";
import {port, db} from './config';
import http from 'http';
import socketio from  'socket.io';
// @ts-ignore
import fileUpload from 'express-fileupload';
import {socketController} from './sockets'
// import responseTime from 'response-time'

import {
    userRoutes,
    authRoutes,
    categoryRoutes,
    productsRoutes,
    bondingAssociatedRoutes,
    shippingRoutes,
    bondingCompaniesRoutes, uploadsRoutes
} from "./routes";
import {connectDb} from "./database/config";
import { ClientToServerEvents, SocketProps } from "./interfaces";
import { User } from "./models";

const app = express();
const port = process.env.PORT || 4100;

//DB CONNECTION.
const connectDatabase = async () => {
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
    await connectDb(db!);
}
connectDatabase().then(_ => {
    console.log('Running DB')
});


//Middlewares
app.use(express.json());
app.use(express.static('public'))
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
// app.use(responseTime())
//TODO rate-limit
//TODO error-handler

//Paths
const userPath = '/api/users'
const authPath = '/api/auth'
const categoryPath = '/api/categories'
const productsPath = '/api/products'
const bondingAssociated = '/api/b-associated'
const shippingPath = '/api/shipping'
const bindingPath = '/api/b-companies'
const uploadFilesPath = '/api/uploads'

//Routes
app.use(`${userPath}`, userRoutes);
app.use(`${authPath}`, authRoutes);
app.use(`${categoryPath}`, categoryRoutes);
app.use(`${productsPath}`, productsRoutes)
app.use(`${bondingAssociated}`, bondingAssociatedRoutes);
app.use(`${shippingPath}`, shippingRoutes);
app.use(`${bindingPath}`, bondingCompaniesRoutes);
app.use(`${uploadFilesPath}`, uploadsRoutes);

//Sockets
const server = http.createServer(app);
const io = new socketio.Server<SocketProps>(server);

// http://localhost:4000/socket.io/socket.io.js for check the connection with the server
io.on("connection",(socket) => {
    // console.log('cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('cliente desconctado');
    })

    //TODO DELETE THIS
    // @ts-ignore
    socket.on('enviar-mensaje', (payload:string) => {
        console.log(payload);
        // TODO peticion base de datos

        // @ts-ignore
        io.emit('enviar-mensaje', payload);

    })

    // @ts-ignore
    socket.on('send-delivery-petition', async (payload) => {
        const idAssociated = payload.associated.id;
        const associated = await User.findById('6349a073f5a836a198d5646f');
        console.log(associated);
        console.log(payload);
        // @ts-ignore
        io.emit('send-delivery-petition', payload);
    })

});


//Public api
app.get('/api', (req, res) => {
    res.json({msg: 'Hello world!'})
})

server.listen(port, () => {
    console.log(`Server running in port ${port}`)
});
