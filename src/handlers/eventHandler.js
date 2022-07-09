module.exports = (client) => {
    client.eventHandler = (eventFiles) => {
        // Loop through every event file
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            // Execute the file once the event is called
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}