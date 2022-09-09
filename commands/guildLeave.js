const { Guild } = require('../models');

// whenever the bot leaves a guild, it is removed from the database
async function guildLeave(guild) {
    // create the new entry in the database
    try {
        await Guild.destroy({ where: { guildId: guild.id}});
    } catch(err) {
        console.error(err);
    }
}

module.exports = guildLeave;