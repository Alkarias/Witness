const init = require('./init');
const db = require('./db');
const setPrefix = require('./setPrefix');
const setBotChannel = require('./setBotChannel');
const guildJoin = require('./guildJoin');
const guildLeave = require('./guildLeave');

module.exports = { init, db, setPrefix, setBotChannel, guildJoin, guildLeave };