var combine = require('stream-combiner')
var through = require('through2')
var split = require("split");
var zlib = require("zlib");

module.exports = function () {
    var movieObj;
    var movieStr= "";
    var grouper = through(write, end);	      
    function write(line, _, next){
        if (line.length === 0) return next();
        var buf = JSON.parse(line);
        if (buf.type === "genre") {
            if (movieObj) movieStr += (JSON.stringify(movieObj) + "\n");
            movieObj = {name: buf.name, books: []}
        } 
        else if (buf.type === 'book') {
            movieObj.books.push(buf.name)
        }
        next();
    }
    function end(fn) {
        if (movieObj)  movieStr +=(JSON.stringify(movieObj) + "\n");
        this.push(movieStr);
        fn();
    }
    return combine(
        split(), grouper, zlib.createGzip()
    )
}
