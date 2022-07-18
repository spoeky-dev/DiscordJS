const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

// Creating Discord client with the required intents
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

// Creating slash command collection
client.slashCommands = new Collection();

// Creating prefix command collection
client.prefixCommands = new Collection();

const handlers = fs.readdirSync('./src/handlers').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events/').filter(file => file.endsWith('.js'));
const slashFolders = fs.readdirSync('./src/commands/slash/');
const prefixFolders = fs.readdirSync('./src/commands/prefix/');

// Executing handler files
(async () => {
    for (file of handlers) {
        require(`./handlers/${file}`)(client);
    }

    client.eventHandler(eventFiles, './src/events');
    client.slashHandler(slashFolders, './src/commands/slash');
    client.prefixHandler(prefixFolders, './src/commands/prefix');
    client.login(process.env.TOKEN);
})();