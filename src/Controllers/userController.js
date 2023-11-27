import initModels from "../Models/init-models.js";
import { Sequelize } from "sequelize";
import sequelize from "../Models/connect.js";
import responseData from "../config/response.js";
import orders from "../Models/orders.js";

let model = initModels(sequelize);


export const createOrder = async (req,res)=>{
    try {
        const { userId, foodId, amount, code, arrSubId } = req.body;

        // Check  the user and food exist
        const user = await model.users.findByPk(userId);
        const food = await model.food.findByPk(foodId);
        if (!user || !food) {
            return responseData(res,"User or food not found","",404)
        }
        // Check if the order already exists
        let existingOrder = await orders.findOne({
            where: {
              user_id: userId,
              food_id: foodId,
            },
          });
          if (existingOrder) {
            // If the order exists, update the amount
            const updatedOrder = await existingOrder.update({
              amount: existingOrder.amount+ amount,
            });
            responseData(res," Thêm số lượng món thành công",updatedOrder,200)
        }else{
            // If the order does not exist, create a new one
      const newOrder = await model.orders.create({
        user_id: userId,
        food_id: foodId,
        amount: amount,
        code: code,
        arr_sub_id: arrSubId

        })
        responseData(res,"Thêm món thành công",newOrder,200)
    }
    } catch (error) {
        console.log(error);
        responseData(res,"Lỗi","",500)
    }
        
}   