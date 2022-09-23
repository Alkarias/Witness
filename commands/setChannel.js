const { Guild } = require('../models');
// command to change the channel that commands can be specified inside of
async function setChannel(message, channelType) {
    const guild = message.guild;
    const channels = guild.channels.cache;
    // create a list of text channels
    const textChannels = [];
    channels.forEach(channel => {
        if (channel.type === 0) {
            textChannels.push({
                id: channel.id,
                name: channel.name
            });
        };
    });

    const content = message.content.split(' ');

    let newChannel;
    textChannels.forEach(channel => {
        if (channel.name === content[1]) newChannel = channel;
    });
    
    if (newChannel) {
        // set channel
        updateChannel(message.guild.id, newChannel.id, channelType);
        await message.channel.send(`Channel set to ${newChannel.name}`);
    } else if (content[1] === 'clear') {
        // clear channel
        updateChannel(message.guild.id, null, channelType);
        await message.channel.send('cleared the channel');
    } else {
        await message.channel.send('That is not a valid channel');
    }
}

function updateChannel(guildId, channelId, channelType) {
    if (channelType === 'botChannel') {
        Guild.update(
            {botChannel: channelId},
            {where: {
                guildId: guildId
            }}
        );
    } else if (channelType === 'notificationChannel') {
        Guild.update(
            {notificationChannel: channelId},
            {where: {
                guildId: guildId
            }}
        );
    }
}

module.exports = setChannel;