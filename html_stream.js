var trumpet = require('trumpet');
var through = require("through2");
var throughStream = through(write);

function write(buffer, _, next) {
    this.push(buffer.toString().toUpperCase());
    next();
}

var tr = trumpet();

var loud = tr.createStream(".loud");
loud.pipe(throughStream).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);
