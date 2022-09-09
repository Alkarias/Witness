const { EmbedBuilder } = require('discord.js');
const { Guild } = require('../models');

// This command initializes the server in the database
// will eventually be replaced with the guildCreate event listener

async function init(message) {
    // create the new entry in the database
    try {
        await Guild.create({
            guildName: message.guild.name,
            guildId: message.guild.id
        });
    } catch(err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            await message.channel.send('This server already has an entry!');
            return;
        }
        console.error(err);
    }
    // fetch the new entry in the database for proof of creation
    const entry = await Guild.findOne({ where: { guildId: message.guild.id }});
    // create an embed for user feedback
    const newGuildEmbed = new EmbedBuilder()
        .setColor(0xFFFFFF)
        .setTitle(entry.guildName)
        .setDescription(entry.guildId);
    await message.channel.send({ embeds: [newGuildEmbed]});
}

module.exports = init;