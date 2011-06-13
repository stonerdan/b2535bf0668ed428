var server = require('http');
var fs     = require('fs');
var port   = 8000;
require('./dateutils.js');

if (require('path').existsSync('logs') == false) {
    fs.mkdirSync('logs', 0755);
}

var uaLog = fs.createWriteStream('logs/user-agents.log',
                                 {flags: 'a', encoding: 'utf8'});

var name = 'Dejan Čančarević';
var len = name.length;
var uaStrings = {};
var test = 0;

var tlsOptions = {
	key: fs.readFileSync('certs/server.rsakey'),
	cert: fs.readFileSync('certs/server.rsacrt')
};

function HandleRequest(req, res) {
    var d = new Date();
    var userAgent = req.headers['user-agent'];
    
    if (!uaStrings[userAgent])
        uaStrings[userAgent] = 'tits' + test++;

    uaLog.write(d.toISODateString() + ': ' + userAgent + '\n');
    res.writeHead(200, {'Content-type': 'text/plain;charset=utf-8'});
    res.end('Date: ' + d.getTime());
}

server.createServer(HandleRequest).listen(port);

console.log('Listening for HTTPS/TLS connections on port ' + port);

