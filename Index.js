const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Witness Online');
});

client.on('messageCreate', async (message) => {
    if (message.content === 'ping') await message.reply('pong');
});

client.login(process.env.token);