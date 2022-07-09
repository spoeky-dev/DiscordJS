const { Prefix } = require('../../config.json');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        if (!message.content.startsWith(Prefix) || message.author.bot) return;

        const args = message.content.slice(Prefix.length).trim().split(/ +/);
        const name = args.shift().toLowerCase();
        const command = client.commands.get(name);

        if (!command) return;

        try {
            await command.execute(message, args, name, client);
            console.log(`DEBUG / PREFIX: Executed '${name}' - ${message.author.username}`);
        } catch (error) {
            console.log(error);
        }

    }
}