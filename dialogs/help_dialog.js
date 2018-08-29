module.exports = function () {
    bot.dialog('/help', [
        function (session) {
            var choices = ["Buscar informacion de la pieza"];
            builder.Prompts.choice(session, "Que accion le gustaria realizar?", choices, { listStyle: builder.ListStyle.button });
        },
        function (session, results) {
            if (results.response) {
                var selection = results.response.entity;
                // route to corresponding dialogs
                switch (selection) {
                    /*case "Obtener listado de artesanos cercanos a mi":
                        session.replaceDialog('/nearByMe');
                        break;*/
                    case "Buscar informacion de la pieza":
                        session.replaceDialog('/findByImage');
                        break;
                    /*case "Buscar informacion por tipo":
                        session.replaceDialog('/findByType');
                        break;*/
                    default:
                        session.reset('/');
                        break;
                }
            }
        }
    ]);
}