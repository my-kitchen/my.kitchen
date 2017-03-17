'use strict';

module.exports = function(server) {
  server.route({
    method: 'GET',
    path: '/api',
    handler: function(req, reply) {
      var message = {
        self: server.info.uri,
        recipes: server.info.uri + '/api/recipes',
        ingredients: server.info.uri + '/api/ingredients',
      };

      reply(message)
        .header('Content-Length', message.length)
        .header('Server', 'HandsOnServer')
      ;
    },
  });
};
