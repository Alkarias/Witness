const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.once('ready', () => {
    console.log('Witness Online');
});

client.on('message', async (message) => {
    if (message.content === 'ping') {
        await message.reply('pong');
    }
});


client.login(process.env.token);