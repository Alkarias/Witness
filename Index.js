const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const sequelize = require('./config/connection');
const { Guild, NotificationList } = require('./models');
const { init, db, setPrefix, setChannel, guildJoin, guildLeave } = require('./commands');

// let botChannel;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
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

client.on('guildCreate', guild => {
    guildJoin(guild);
});

client.on('guildDelete', guild => {
    guildLeave(guild);
});

client.on('messageCreate', async (message) => {
    // initialize the server in the database
    if (message.content === '!init') {
        init(message);
        return;
    }

    // grab all information relating to the current guild
    const guild = await Guild.findOne({ where: { guildId: message.guild.id }});
    const botChannel = guild.botChannel; // easy reference to the guild's bot channel
    const prefix = guild.prefix; // easy reference to the guild prefix

    // ignore the command if a bot channel exists and the command is not inside it
    if (botChannel && message.channel.id !== botChannel) return;
    // check to see if this is intended to be a command
    if (message.content.charAt(0) !== prefix ) return;
    // remove the prefix from the command once checked
    message.content = message.content.slice(1).toLowerCase();
    const command = message.content.split(' ');
    // command for the message 'ping'
    // sanity check
    if (message.content === 'ping') {
        await message.reply('pong');
    }

    // command for the message 'notfications' which can be aliased as 'notifs'
    if (['notifications', 'notifs'].includes(command[0])) {
        const notifSettingsEmbed = new EmbedBuilder()
            .setColor(0x54828a)
            .setTitle('Notifications');

        await message.channel.send({ embeds: [notifSettingsEmbed]});
    }

    // set the prefix of the server
    if (['prefix'].includes(command[0])) {
        setPrefix(message);
    }

    // show the database entries of the server
    if (['db', 'database'].includes(command[0])) {
        db(message);
    }

    // set the bot channel of the server
    if (['botchannel', 'channel'].includes(command[0])) {
        setChannel(message, 'botChannel');
    }

    // set the notification channel of the server
    if (['notifChannel', 'notif', 'notifications'].includes(command[0])) {
        setChannel(message, 'notificationChannel');
    }
});

sequelize.sync({ force: false, alter: false }).then(() => {
    client.login(process.env.token);
});