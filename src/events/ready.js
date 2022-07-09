module.exports = {

    // The name of your event
    name: 'ready',
    // Should the event only be called once per runtime
    once: true,

    // The code executed once the event is called
    execute(client) {
        console.log(`\nINFO: Ready! Logged in as ${client.user.tag}\n`);
    },
};