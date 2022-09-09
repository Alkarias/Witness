const { Guild } = require('../models');

// whenever the bot joins a new guild, it is added to the database
async function guildJoin(guild) {
    // create the new entry in the database
    try {
        await Guild.create({
            guildName: guild.name,
            guildId: guild.id
        });
    } catch(err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            // await message.channel.send('This server already has an entry!');
            console.log('already in the database')
            return;
        }
        console.error(err);
    }
}

module.exports = guildJoin;