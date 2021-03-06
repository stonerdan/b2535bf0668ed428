var server = require('https');
var fs     = require('fs');
var port   = 8000;
require('./dateutils.js');

if (require('path').existsSync('logs') == false) {
    fs.mkdirSync('logs', 0755);
}

var uaLog = fs.createWriteStream('logs/user-agents.log',
                                 {flags: 'a', encoding: 'utf8'});

var tlsOptions = {
	key: fs.readFileSync('certs/server.rsakey'),
	cert: fs.readFileSync('certs/server.rsacrt')
};

function HandleRequest(req, res) {
    var d = new Date().toISODateString();
    var userAgent = req.headers['user-agent'];

    uaLog.write(d + ': ' + userAgent + '\n');
    res.writeHead(200, {'Content-type': 'text/plain;charset=utf-8'});
    res.end('Date: ' + d);
}

server.createServer(tlsOptions, HandleRequest).listen(port);

console.log('Listening for HTTPS/TLS connections on port ' + port);

