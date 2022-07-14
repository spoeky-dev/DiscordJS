const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

// Bot id
const clientId = '';
// Server id
const guildId = '';

module.exports = (client) => {
    client.slashHandler = (commandFolders, path) => {
        client.commandArray = [];
        // Loop through command files
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'))
            for (const file of commandFiles) {
                const command = require(`../commands/slash/${folder}/${file}`);

                console.log(`SLASH: Found '${command.data.name}'`);

                // Add the command to the command collection
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        // Slash (/) commands

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        (async () => {
            try {
                console.log('SLASH: Started refreshing application commands');

                await rest.put(

                    // These slash commands are global, meaning they can be executed in any server!
                    // If you want to limit your slash commands to only be executed in one server, do the following:
                    /*
                        Routes.applicationGuildCommands(clientId, guildId),
                        { 
                            body: client.commandArray 
                        },
                    */

                    Routes.applicationCommands(clientId),
                    {
                        body: client.commandArray
                    },

                );

                console.log('SLASH: Successfully refreshed application commands');
            } catch (error) {
                console.log("WARNING: Your set Client / Guild ID seems to be invalid.");
            }
        })();

    }
}