import config from "../config/config.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize( config.database,config.user,config.pass, {
    host: config.host,
    port: config.port,
    dialect: config.dialect // tên CSDL đang sử dụng
});
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
export default sequelize