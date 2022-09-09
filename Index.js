const { Client, GatewayIntentBits, Message } = require('discord.js');
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
    if (message.content === 'ping') {
        await message.reply('pong');
        // await botChannel.send(`${'pong'}`);
    }
});


client.login(process.env.token);