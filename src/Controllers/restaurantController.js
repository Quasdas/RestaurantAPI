import initModels from "../Models/init-models.js";
import { Sequelize } from "sequelize";
import sequelize from "../Models/connect.js";
import responseData from "../config/response.js";

let model = initModels(sequelize);
let op = Sequelize.op;

export const resLike = async (req, res) => {
    try {
        let { userId, resId } = req.body;

        let check = await model.like_res.findOne({
            where: {
                user_id: userId,
                res_id: resId,
            },
        });

        if (check) return responseData(res, "user_id và res_id đã tồn tại dữ liệu trong db", [], 400);

        let newData = {
            user_id: +userId,
            res_id: +resId,
            date_like: new Date(),
        };

        const likeResNew = await model.like_res.create(newData);

        return responseData(res, "Like thanh cong", likeResNew, 200);
    } catch (error) {
        return responseData(res, "Lỗi ...", "", 500);
    }
};
export const resUnlike = async (req, res) => {
  try {
    let { userId, resId } = req.body;
    let existingLike = await model.like_res.findOne({
        where: {
          user_id: userId,
          res_id: resId,
        },
      });
    if (existingLike) {
      const unlikeRes = await model.like_res.destroy({
        where: {
          user_id: userId,
          res_id: resId,
        },
      });
      responseData(res, "unlike thanh cong", unlikeRes, 200);
    }
  } catch (error) {
    console.log(error);
    responseData(res,"Loi","",500)
  }
};


export const getLikes = async(req,res)=>{

    let {userId} = req.body
    const likes = await model.like_res.findAll({
        where:{
            user_id:userId
        },
        include: [{
            model: model.users,
            as: 'user',
            attributes: ['full_name', 'email']
          }]
    })
    responseData(res, "Thanh Cong", likes, 200);
}
export const resRates = async (req,res)=>{
    try {
    let { userId, resId ,amount } = req.body;
    if (amount < 1 || amount > 5) {
        return responseData(res, "Amount must be between 1 and 5", "", 400);
      }
    const check = await model.rate_res.findOne({
        where:{
            user_id:userId,
            res_id:resId
        }
    })
    console.log(check);
    if (check){
       let data = await model.rate_res.update({
        amount: amount,
        date_rate: new Date(),
      },
      {
        where: {
          user_id: userId,
          res_id: resId,
        },
      }
    )
        responseData(res, "Update thành công ", data, 200);
    }else{
        let newData = {
            user_id:userId,
            res_id:resId,
            amount:amount,
            date_rate:new Date()
        }
        let data = await model.rate_res.create(newData)
        responseData(res, "Thanh Cong", data, 200);
    }
    } catch (error) {
        console.log(error);
        responseData(res,"Loi","",500)
    }
}
export const getRates = async (req,res) =>{
    let {userId} = req.body
    const rates = await model.rate_res.findAll({
        where:{
            user_id:userId,
        },
        include: [{
            model: model.users,
            as: 'user',
            attributes: ['full_name', 'email']
          },{
            model:model.restaurant,
            as:'re',
            attributes:['res_name','description']
          }]
    })
    responseData(res, "Thanh Cong", rates, 200);
}