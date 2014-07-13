#!/usr/bin/env node
var crypto = require('crypto');
var os = require('os');

var Cookies = require('cookies');

var settings = {
	hashes: [],
	redirect: '/',
};

module.exports = function(env) {
	for (var k in env) {
		settings[k] = env[k];
	}
	return module.exports;
};

module.exports.auth = function(req, next) {
	var cookies = new Cookies(req);
	var hash = cookies.get('session') ?
		module.exports.hash(cookies.get('session')) : '';
	if (settings.hashes.indexOf(hash) >= 0) {
		next();
	} else {
		next(new Error('Bad session key.'));
	}
};

module.exports.sign = function(req, res) {
	var cookies = new Cookies(req, res);
	var query = req.url.slice(req.url.indexOf('?') + 1);
	cookies.set('session', query ? module.exports.hash(query) : null);
	res.writeHead(302, {location: settings.redirect});
	res.end();
};

module.exports.generate = function() {
	var key = crypto.randomBytes(24).toString('base64');
	var hash = module.exports.hash(module.exports.hash(key));
	settings.hashes.push(hash);
	return {key: key, hash: hash};
};

module.exports.hash = function(key) {
	var hmac = crypto.createHmac('SHA256', key);
	hmac.update(key);
	return hmac.digest('base64');
};

if (require.main === module) {
	var pair = module.exports.generate();
	console.log('Call authlink.generate() inline or add\nauthlink({hashes:[\'' + 
		pair.hash + '\']})\nand then authenticate on module.exports.sign with\n' +
		pair.key);
}
