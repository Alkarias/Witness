const init = require('./init');
const db = require('./db');
const setPrefix = require('./setPrefix');
const setChannel = require('./setChannel');
const guildJoin = require('./guildJoin');
const guildLeave = require('./guildLeave');

module.exports = { init, db, setPrefix, setChannel, guildJoin, guildLeave };