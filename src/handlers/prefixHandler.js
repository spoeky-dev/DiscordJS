const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.prefixHandler = (prefixFolders, path) => {
        client.commandArray = [];
        // Loop through command files
        for (folder of prefixFolders) {
            const prefixFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'))
            for (const file of prefixFiles) {
                const command = require(`../commands/prefix/${folder}/${file}`);

                console.log(`PREFIX: Found '${command.name}'`)

                // Add the command to the command collection
                client.commands.set(command.name, command);
                client.commandArray.push(command.data);
            }
        }

    }
}