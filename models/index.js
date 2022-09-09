const Guild = require('./Guild');
const NotificationList = require('./NotificationList');

Guild.hasOne(NotificationList, {
    foreignKey: 'notifications_id',
    onDelete: 'CASCADE'
});

NotificationList.belongsTo(Guild, {
    foreignKey: 'notifications_id'
});

module.exports = { Guild, NotificationList };

