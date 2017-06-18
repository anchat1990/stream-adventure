var duplexer = require("duplexer2");
var through = require("through2");

module.exports = function(counter) {
    var counts = {};
    var writable = through({objectMode: true}, function(buf, _, next) {
        counts[buf.country] = (counts[buf.country] || 0) + 1;
        next();
    },
    function(end) {
        counter.setCounts(counts);
        end();
    });
    // writable is the through stream that u can write() to
    return duplexer({objectMode: true}, writable, counter)
}
