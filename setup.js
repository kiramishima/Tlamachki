module.exports = function () {
    global.restify = require('restify');
    global.builder = require('botbuilder');
    global.locationDialog = require('botbuilder-location');
    global.RetrieveUserProfile = require('botbuilder-facebookextension').RetrieveUserProfile;

    // Storage
    var inMemoryStorage = new builder.MemoryBotStorage();
    // Create chat connector for communicating with the Bot Framework Service
    var connector = new builder.ChatConnector({
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD
    });

    global.bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);
    // Do not persist userData
    global.bot.set(`persistUserData`, true);

    // Do not persist conversationData
    global.bot.set(`persistConversationData`, true);
    // Create Bot Instance
    /*global.bot = new builder.UniversalBot(connector, session => {
        session.sendTyping();
        session.replaceDialog('/start');
    });*/

    //global.bot.library(locationDialog.createLibrary(process.env.BING_MAPS_API_KEY));

    /*global.bot.use(
        RetrieveUserProfile({
            accessToken: process.env.FacebookAccessToken,
        })
    );*/

    // Add recognizer
    //global.bot.recognizer(new facebook.CallbackRecognizer());


    // Setup Restify Server
    var server = restify.createServer();
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.bodyParser());
    server.listen(process.env.port || 3978, function () {
        console.log('%s listening to %s', server.name, server.url);
    });
    server.post('/api/messages', connector.listen());
}