const { Client, GatewayIntentBits, EmbedBuilder, EmbedAssertions } = require('discord.js');
require('dotenv').config();
const sequelize = require('./config/connection');
const Guild = require('./models/guild');

let botChannel;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
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

    console.log('Witness Online');
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
            .setColor(0x54828a)
            .setTitle('Notifications');

        await message.channel.send({ embeds: [notifSettingsEmbed]});
    }

    if (['db', 'database'].includes(message.content)) {

        await message.channel.send('could not connect');
    }

    // This needs to be put into a 'guildCreate' event listener
    if (['init'].includes(message.content)) {
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
});

sequelize.sync({ force: false }).then(() => {
    client.login(process.env.token);
});