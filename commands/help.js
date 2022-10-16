const { EmbedBuilder } = require('discord.js');

async function help(message) {
    const guildEmbed = new EmbedBuilder()
    .setColor(0xFFFFFF)
    .setTitle('Help')
    .addFields(
        { name: 'Change the prefix of the server', value: '`prefix`' },
        { name: 'Display the database entry of the current server', value: '`db`, `database`' },
        { name: 'Set command channel exclusivity for the bot', value: '`bc`, `botchannel`, `bchannel`' },
        { name: 'Set the channel that notifications will be displayed', value: '`nc`, `notifchannel`, `nchannel`, `notificationchannel`' },
        { name: '(WIP) Show the daily rotation', value: '`daily`' },
    );
await message.channel.send({ embeds: [guildEmbed] });
}

module.exports = help;