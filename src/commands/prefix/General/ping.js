module.exports = {

  // The name of your command
  name: 'ping',
  // The aliases of your command
  aliases: ['p'],
  // The description of your command
  description: 'The classic ping command',

  // The code executed once the command is called
  async execute(message, args, name, client) {
    await message.reply("Pong!")
  }
}