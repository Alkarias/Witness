const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Guild extends Model {}

Guild.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        guildId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        guildName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prefix: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '!'
        },
        botChannel: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notificationChannel: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notifications_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'notificationList',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'guild'
    }
);

module.exports = Guild;