import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import helmet from "helmet";

import {
    userRoutes,
    authRoutes, categoryRoutes, productsRoutes, bondingAssociatedRoutes
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
app.use(cors());
app.use(helmet());

//Paths
const userPath = '/api/users'
const authPath = '/api/auth'
const categoryPath = '/api/categories'
const productsPath = '/api/products'
const bondingAssociated = '/api/b-associated'

//Routes
app.use(`${userPath}`, userRoutes);
app.use(`${authPath}`, authRoutes);
app.use(`${categoryPath}`, categoryRoutes);
app.use(`${productsPath}`, productsRoutes)
app.use(`${bondingAssociated}`, bondingAssociatedRoutes)

app.get('/api', (req, res) => {
    res.json({msg: 'Hello world!'})
})

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
});