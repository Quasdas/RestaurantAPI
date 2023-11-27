import express  from 'express'
import { getLikes, getRates, resLike, resRates, resUnlike } from '../Controllers/restaurantController.js';

const restaurantRoutes=express.Router();

restaurantRoutes.post("/like",resLike)
restaurantRoutes.post("/unlike",resUnlike)
restaurantRoutes.get("/get-like",getLikes)
restaurantRoutes.post("/rate",resRates)
restaurantRoutes.get("/get-rate",getRates)
export default restaurantRoutes;