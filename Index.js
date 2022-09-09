const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

let botChannel;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Witness Online');

    const channel = '1017643713461239908';
    botChannel = client.channels.cache.get(channel);
    const guild = client.guilds.cache.get(process.env.devGuild);

    let commands;
    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'replies with pong'
    });
});

client.on('messageCreate', async (message) => {
    // stop running the command if in the wrong channel
    if (message.channel !== botChannel) return;

    // command for the message 'ping'
    if (message.content === 'ping') {
        await message.reply('pong');
    }

    // command for the message 'notfications' which can be aliased as 'notifs'
    if (['notifications', 'notifs'].includes(message.content)) {
        const notifSettingsEmbed = new EmbedBuilder()
            .setColor(0x015599)
            .setTitle('Notifications');

        await message.channel.send({ embeds: [notifSettingsEmbed]});
    }
});


client.login(process.env.token);