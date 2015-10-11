module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/status', server.loopback.status());
  server.use(router);

  router.get('/', function(req, res) {
    var routes = {};
    var classes = server.remotes().classes();
    for(var i = 0; i < classes.length; i++) {
      var classObj = classes[i];
      routes[classObj.name] = server.get('url').replace(/\/$/, '') + classObj.http.path + '/';
    }

    res.send(routes);
  });
};
