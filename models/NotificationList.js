const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class NotificationList extends Model {}

NotificationList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        raidAndDungeon: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        europa: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dreamingCity: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        crucible: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        xur: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        eververse: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        seasonal: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'notificationList'
    }
)

module.exports = NotificationList;