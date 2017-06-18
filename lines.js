var split = require('split');
var through2 = require('through2');
var lineNum = 1;

process.stdin
.pipe(split())
.pipe(through2(function (line, _, next) {
    if (lineNum % 2 === 0) this.push(line.toString().toUpperCase()+"\n");
    if (lineNum % 2 === 1) this.push(line.toString().toLowerCase()+"\n");
    lineNum++;
    next();
}))
.pipe(process.stdout);
