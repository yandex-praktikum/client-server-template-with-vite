const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
    process.env;
const numPort = Number(POSTGRES_PORT);
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Forum, ForumComments, Ladder } from "./tables";

const sequelizeOptions: SequelizeOptions = {
    host: "localhost",
    port: numPort,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    dialect: "postgres",
};

export const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([Ladder, Forum, ForumComments]);
