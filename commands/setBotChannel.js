const { Guild } = require('../models');
// command to change the channel that commands can be specified inside of
async function setBotChannel(message) {
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
        if (channel.name === content[1]) newChannel = channel.id
    });
    
    if (newChannel) {
        Guild.update(
            {botChannel: newChannel},
            {where: {
                guildId: message.guild.id
            }}
        );
        await message.channel.send(newChannel);
    } else if (content[1] === 'clear') {
        Guild.update(
            {botChannel: null},
            {where: {
                guildId: message.guild.id
            }}
        );
        await message.channel.send('cleared the channel');
    } else {
        await message.channel.send('This is not a valid channel');
    }
}

module.exports = setBotChannel;