import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'

import {
    userRoutes,
    authRoutes, categoryRoutes, productsRoutes
} from './routes'
import {connectDb} from "./database/config";

dotenv.config();
const app = express();
const port = process.env.PORT || 4100;

//DB CONNECTION.
const connectDatabase = async () => {
    await connectDb();
}
connectDatabase().then(_ => {
    console.log('Running DB')
});


//Middlewares
app.use(express.json());
app.use(express.static('public'))
app.use(morgan('tiny'));
app.use(cors())

//Paths
const userPath = '/api/users'
const authPath = '/api/auth'
const categoryPath = '/api/categories'
const productsPath = '/api/products'

//Routes
app.use(`${userPath}`, userRoutes);
app.use(`${authPath}`, authRoutes);
app.use(`${categoryPath}`, categoryRoutes);
app.use(`${productsPath}`, productsRoutes)

app.get('/api', (req, res) => {
    res.json({msg: 'Hello world!'})
})

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
});