import express from 'express';
import cors from 'cors';
import {} from 'dotenv/config.js'
import { RouterList } from './Router/RouterPage.js';
import { dbConnection } from './db.js';
import { ProductRoute } from './Router/ProductRouter.js';
import { isAuth } from './Helper/isAuth.js';
import { RentalProductRoute } from './Router/RentalRouter.js';

const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use(cors());
await dbConnection();

app.use('/',RouterList);
app.use('/rental',isAuth,ProductRoute);
app.use('/admin',isAuth,RentalProductRoute);

app.listen(PORT,()=>{console.log("Listening...",PORT)})
