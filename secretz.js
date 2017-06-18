var tar = require('tar');
var parser = tar.Parse();
var zlib = require("zlib");
var crypto = require('crypto');
var pathParse = require("path-parse");
var concat = require("concat-stream");

parser.on('entry', function (entry) {
    if (entry.type !== "File") return;
    entry.pipe(crypto.createHash('md5', { encoding: 'hex' })).pipe(
        concat(function(body) {
            console.log(body + " " + entry.path);
        }));
});


process.stdin.pipe(
    crypto.createDecipher(process.argv[2], process.argv[3])).pipe(
    zlib.createGunzip()).pipe(
    parser);
