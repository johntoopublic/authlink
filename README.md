authlink
========

A simple node.js middleware to generate and check HMAC signed cookies for lightweight authentication.

**[sign](/index.js#L30)** generates the cookie as a standard request, and redirects to authlink({redirect:'url'}).

    function (req, res) {
      authlink.sign(req, res)
    }

**[auth](/index.js#L19)** checks the generated cookie.

    var authlink = require('authlink');
    // [auth](/index.js#L19) is a request wrapper,
    // throwing an error if there's not a specified key.
    function (req, res) {
      authlink.auth(req, function(e) {
        if (!e) {
          res.writeHead(200);
          // ...
        }
      });
    }
    // Also allows authenticating socket.io requests.
    io(server).use(function(socket, next) {
      authlink.auth(socket.request, next);
    });
