require('./setup.js')();
require('./dialogs/help_dialog')();
require('./dialogs/menu_dialog')();
require('./dialogs/findByType_dialog')();
require('./dialogs/findByImage_dialog')();
require('./dialogs/nearByMe_dialog')();

bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^bye/i });
bot.beginDialogAction('start', '/start', { matches: /^home/i });
bot.beginDialogAction('help', '/help', { matches: /^menu/i });
// bot.beginDialogAction('profile', '/profile', { matches: /^profile/i });

bot.dialog('/', [
    (session) => {
        session.replaceDialog('/start');
    }
]);

bot.dialog('/start', [
    (session) => {
        session.send(`Hola ${session.userData.first_name}!`);
        session.sendTyping();
        session.send("Mi mision es ayudarlo a conectarlo con el artesano de la pieza que desea adquirir");
        /*if (!session.userData.first_name) {
            session.replaceDialog('/profile');
        } else {*/
        session.replaceDialog('/help');
        //}
    }
]);

/*bot.dialog('/profile', [
    (session) => {
        session.send("Antes de comenzar, necesito algunos datos muy importantes para brindarte un mejor servicio, asi que comencemos :-)");
        builder.Prompts.text(session, 'Hola! Cual es tu correo electronico?');
    },
    function (session, args, next) {
        if (!session.userData.phone) {
            builder.Prompts.text(session, 'Proporciona un numero telefonico');
        } else {
            next();
        }
    },
    function (session){
        session.send("Send me your current location.");
    },
    /*function (session){
        var data = { method: "sendMessage", parameters: { text: "<b>Save time by sending us your current location.</b>", parse_mode: "HTML", reply_markup: { keyboard: [ [ { text: "Share location", request_location: true } ] ] } } };
        const message = new builder.Message(session);
        message.sourceEvent({
            facebook: {
                "quick_replies":[
                    {
                      "content_type":"location"
                    }
                ]
            }
        });
        // message.setChannelData(data);
        session.send(message);
    },
    function (session) {
        console.log({session})
        if(session.message.entities.length != 0){
            session.userData.lat = session.message.entities[0].geo.latitude;
            session.userData.lon = session.message.entities[0].geo.longitude;
            session.endDialog();
        }else{
            session.endDialog("Sorry, I didn't get your location.");
        }
    },
    function (session, results) {
        session.userData.phone = results.response;
        session.endDialog();
        session.beginDialog('/menu');
    }
]);*/