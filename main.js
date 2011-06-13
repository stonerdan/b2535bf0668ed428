var server = require('http');
var fs     = require('fs');
var port   = 8000;
var crypto = require('crypto');

if (require('path').existsSync('logs') == false) {
    fs.mkdirSync('logs', 0755);
}

var uaLog = fs.createWriteStream('logs/user-agents.log',
                                 {flags: 'a', encoding: 'utf8'});

var name = 'Dejan Čančarević';
var len = name.length;
var uaStrings = {};
var test = 0;

function ISODateString(d) {
    function pad(n){
        return n < 10 ? '0' + n : n
    }
    function pad3(n){
        if (n < 10) return '00' + n;
        if (n < 100) return '0' + n;
        return n;
    }
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+'.'
    + pad3(d.getUTCMilliseconds())+'Z'
}

var tlsOptions = {
	key: fs.readFileSync('certs/server.rsakey'),
	cert: fs.readFileSync('certs/server.rsacrt')
    };

function HandleRequest(req, res) {
    var d = new Date();
    var userAgent = req.headers['user-agent'];
    
    if (!uaStrings[userAgent])
        uaStrings[userAgent] = 'tits' + test++;
        
    uaLog.write(ISODateString(d) + ': ' + userAgent + '\n');
    res.writeHead(200, {'Content-type': 'text/plain;charset=utf-8'});
    res.end('Date: ' + d.getTime());
}

server.createServer(HandleRequest).listen(port);

console.log('Creating DH objects');

var dhA = crypto.createDiffieHellman('00b3f006b4175090c6a0a8bffd00fa' +
                                     '5cc368fd40b3adc89ccad3861b8c5c' +
                                     '292c7a07cede4e805917567eba5aa4' +
                                     '932aae453caab946670165d6ea50f6' +
                                     '7d7e89e9db', 'hex');                                     

console.log('Generating DH keys');

var pubA = dhA.generateKeys('hex');
var pubB = dhA.generateKeys('hex');

console.log(pubA);
console.log(pubB);
               
console.log('Listening for HTTPS/TLS connections on port ' + port);

