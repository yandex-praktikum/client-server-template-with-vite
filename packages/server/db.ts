import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Forum, ForumComments, Ladder } from "./tables";

const host = process.env.POSTGRES_HOST ?? "localhost";

const sequelizeOptions: SequelizeOptions = {
    host: host,
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    dialect: "postgres",
};

export const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([Ladder, Forum, ForumComments]);
