const { Guild } = require("../models");

//command to change a guild's prefix 
async function setPrefix(message) { 
    const command = message.content.split(' ');
    const newPrefix = command[1];
    console.log(newPrefix);

    Guild.update(
        {prefix: newPrefix},
        {where: {
            guildId: message.guild.id
        }}
    );

    await message.channel.send(`Prefix changed to ${newPrefix}`);
}

module.exports = setPrefix;