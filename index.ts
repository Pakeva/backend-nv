import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import helmet from "helmet";
import {port, db} from './config';
import http from 'http';
import socketio from  'socket.io';

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

const app = express();

//DB CONNECTION.
const connectDatabase = async () => {
    await connectDb(db);
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
io.on("connection", (socket) => {
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
    socket.on('send-delivery-petition', (payload) => {
        console.log(payload);
        console.log('desde next');
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
