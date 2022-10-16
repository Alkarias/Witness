const { Guild, NotificationList } = require('../models');
require('dotenv').config();

const apiKey = process.env.BUNGIEAPIKEY;

const ROOTPATH = 'https://www.bungie.net/Platform';

async function notifier(message) {
    message.channel.send('This is the notifier!');

    const apiRequest = await fetch(`${ROOTPATH}/Destiny2/Vendors/`, {
        method: 'get',
        headers: {
            'X-API-Key': apiKey
        }
    });
    await message.channel.send(apiRequest);

}

module.exports = notifier;