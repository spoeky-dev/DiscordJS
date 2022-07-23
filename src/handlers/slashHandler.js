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

                // Add the command to the command collection and array
                client.slashCommands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        // Slash (/) commands

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        (async () => {
            try {
                console.log('SLASH: Started refreshing application commands');

                await rest.put(

                    /*

                    Currently, your slash commands are only available on the server you entered as 'guildID'.
                    If you want your bots slash commands to function on multiple servers, change the code 
                    below this comment to the following bit:

                    Routes.applicationCommands(clientId),
                    {
                        body: client.commandArray
                    },

                    WARNING: If you do end up using the code bit above, refreshing your slash commands could
                    take multiple hours to finish! However, once they are finished refreshing, your
                    bots slash commands will work on any server its properly invited on.


                    */

                    Routes.applicationGuildCommands(clientId, guildId),
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