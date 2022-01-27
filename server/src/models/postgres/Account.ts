import { DataTypes } from "sequelize"
import postgres from "../../databases/postgres";

const Account = postgres.define("Account", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username_lower: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    maxScores: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
            snake: 0
        }
    },
    access_token: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: ""
    },
    refresh_token: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: ""
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Account;