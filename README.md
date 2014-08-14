authlink [![npm downloads](http://img.shields.io/npm/dm/authlink.svg)](https://npmjs.org/package/authlink) [![npm version](http://img.shields.io/npm/v/authlink.svg)](https://npmjs.org/package/authlink) [![license](http://img.shields.io/npm/l/authlink.svg)](http://unlicense.org)
========

A simple node.js middleware to generate and check HMAC signed cookies for lightweight authentication.

     ~ npm start

    > authlink@0.2.0 start /root/src/authlink
    > node index.js

    Call authlink.generate() for a keypair or add
    authlink({hashes:['eYRYURogrkOdhnhmKbAiSpBFff/D+8x9OgGv9WvuY6U=']})
    and then authenticate on authlink.sign with the querystring
    ?key=CKkPt%2B33Cl8hfWWNwrVcmWPLFCNIHxp4

**[sign](/index.js#L34)** generates the cookie as a standard request, and redirects to authlink({redirect:'url'}) or ?path=url.

    function (req, res) {
      authlink.sign(req, res)
    }

**[auth](/index.js#L21)** checks the generated cookie.

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
