import { Sequelize } from "sequelize";
import pg from "pg"

const HOST: string = process.env.POSTGRES_HOST || "";
const PORT: string = process.env.POSTGRES_PORT || "5432";
const DB_NAME: string = process.env.POSTGRES_DB_NAME || "postgres"
const USERNAME: string = process.env.POSTGRES_USERNAME || "postgres"
const PASSWORD: string = process.env.POSTGRES_PASSWORD || "password";

const URI: string = `postgres://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`

const postgres = new Sequelize(URI, {
    dialect: "postgres",
    dialectModule: pg,
    logging: false
});

export default postgres;