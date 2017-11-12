module.exports = function() {
    bot.dialog('/nearByMe', [
        (session) => {
            var options = {
                prompt: "Donde te encuentras en este momento?",
                useNativeControl: true
            };

            locationDialog.getLocation(session, options);
        },
        (session) => {
            if (results.response) {
                var place = results.response;
                console.log({place})
                session.send("Estamos obteniendo la informacion para ti");
            }
        }
    ]);
}