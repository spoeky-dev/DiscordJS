const { Prefix } = require('../../config.json');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        if (!message.content.startsWith(Prefix) || message.author.bot) return;

        const args = message.content.slice(Prefix.length).trim().split(/ +/);
        const name = args.shift().toLowerCase();
        const command = client.prefixCommands.get(name) || client.prefixCommands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

        if (!command) return;

        try {
            await command.execute(message, args, message.author, client);
        } catch (error) {
            console.log(error);
        }

    }
}