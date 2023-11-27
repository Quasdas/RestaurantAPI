import express  from 'express'
import { createOrder } from '../Controllers/userController.js';

const userRoutes = express.Router();


userRoutes.post("/create-order",createOrder)

export default userRoutes