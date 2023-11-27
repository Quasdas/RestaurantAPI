import express from 'express'
import cors from 'cors'
import rootRoutes from './Routes/rootRoutes.js';
const app = express();
app.listen(5000);
app.use(express.json())
app.use(cors());
app.use(rootRoutes);


