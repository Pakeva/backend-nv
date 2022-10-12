import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'

// import router from './routes/user'
import {
    userRoutes
} from './routes'

dotenv.config();
const app = express();
const port = process.env.PORT || 4100;

//Middlewares
app.use(express.json());
app.use(express.static('public'))
app.use(morgan('tiny'));
app.use(cors())

//Paths
const userPath = '/api/users'

app.use(`${userPath}`, userRoutes);

app.get('/api', (req, res) => {
    res.json({msg:'Hello world!'})
})

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
});