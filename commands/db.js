const { EmbedBuilder } = require('discord.js');
const { Guild } = require('../models');

// this command shows the current guild's entry in the database

async function db(message) {
    const guild = await Guild.findOne({ where: { guildId: message.guild.id }});
        if (!guild) {
            await message.channel.send('could not connect');
            return;
        }
        const guildEmbed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle(guild.guildName)
            .setDescription(`config for guild ${guild.guildId}`)
            .addFields(
                { name: 'prefix', value: guild.prefix },
                { name: 'Bot channel', value: guild.botChannel || 'None Selected'},
                { name: 'Notification channel', value: guild.notificationChannel || 'None Selected'}
            );
        await message.channel.send({ embeds: [guildEmbed] });
}

module.exports = db;