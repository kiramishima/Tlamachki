
var Promise = require('bluebird');
var request = require('request-promise').defaults({ encoding: null });
var fs = require('fs');
var path = require('path');
// var vision = require('../backend');

module.exports = function() {
    bot.dialog('/findByImage', [
        (session) => {
            session.send("Para poder usar obtener la informacion que usted busca sobre la pieza, necesito una foto de la pieza.");
            var choices = ["Si", "No"];
            builder.Prompts.choice(session, "Estamos listos?", choices, { listStyle: builder.ListStyle.button });
        },
        (session, args, next) => {
            // Si si
            if (args.response) {
                var selection = args.response.entity;
                switch (selection) {
                    case "Si":
                        next();
                        break;
                }
            }
        },
        (session) => {
            builder.Prompts.attachment(session, 'Esperando imagen...');
            /*setTimeout(() => {
                next();
            }, 15000);*/
        },
        (session, args, next) => {
            // recibimos la imagen
            var msg = session.message;
            if (msg.attachments && msg.attachments.length > 0) {
                var attachment = msg.attachments[0];
                var fileDownload = request(attachment.contentUrl);
                fileDownload.pipe(fs.createWriteStream(path.join(__dirname, '../uploads/', attachment.name)))
                .on('close', function () {
                    next({filename: attachment.name})
                });
                // next({filename: attachment.name})
            }
        },
        (session, args, next) => {
            session.send("Espere un momento por favor");
            const options = {
                method: 'POST',
                uri: 'http://ptsv2.com/t/e0w93-1535522637/post',
                formData: {
                  image:{
                    value: fs.createReadStream(path.join(__dirname, '../uploads/', args.filename)),
                    options: {
                        filename: args.filename,
                        contentType: 'image/jpg'
                    }
                  }
                }
            };
            request.then(function (parsedBody) {
                // POST succeeded...
                next({filename: attachment.name})
            })
            .catch(function (err) {
                next({err})
            });
            /*vision(path.join(__dirname, '../files/mona_lisa3.jpg')).then(res => {
                console.log({res});
                // Retornamos el resultado
                var reply = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel);
                let cards = [res].map((element) => {
                    return new builder.HeroCard(session)
                        .title(element.name)
                        .subtitle(element.address)
                        .buttons([
                            builder.CardAction.openUrl(session, `https://www.google.com/maps/search/?api=1&query=${element.lat},${element.lng}`, 'Como llegar')
                        ]);
                });
                reply.attachments(cards);
                session.send(reply);
                session.endConversation();
                // session.endDialog();
            });*/
        },
        (session, args) => {
            session.send("TODO Resultados");
        }
    ]);
}