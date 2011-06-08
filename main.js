var server = require('http');
var fs     = require('fs');
var port   = 8000;
var crypto = require('crypto');

var uaLog = fs.createWriteStream('logs/user-agents.log', {flags: 'a', encoding: 'utf8'});

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

/*
var dhA = crypto.createDiffieHellman('00e6f9eccbb6cd0a15bdff1a2917ba' +
                                     '5537853f54ea02a82623fcc31a1a52' +
                                     '42d5046397e27733d2257e1c0a21a0' +
                                     '334c8d5fc8cefca65dc7cd1dac814d' +
                                     '8ea35b39b1d63a9817df820abf708a' +
                                     '40dec89ba1b80bd112e9c151421279' +
                                     'b56ce7c05da575df4d4d9176a50cec' +
                                     '09a1e38a4ccacb8a37ccebea29d9b9' +
                                     '8f369cd1f0c59bbe2f2d052f701e27' +
                                     'e406caa3eff5ec979f2ca410767807' +
                                     '5d430ef71be04c375a5ba16791e299' +
                                     'a142cf77ed398dcc0a866300642749' +
                                     '5bba8d40dd0966f348a70a3286e446' +
                                     '31cb948bed1705784c994f646f5383' +
                                     '506ca9ea8ceb2eaea4fc93361c2a27' +
                                     '783452353af35ec307ec4629709ab2' +
                                     'ab34ee625b6c3dea52b1b54b25ac2c' +
                                     '3b13', 'hex');
*/

//var dhB = crypto.createDiffieHellman(dhA.getPrime());

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

console.log('Computing shared DH secrets');

//var secretA = dhA.computeSecret(dhB.getPublicKey(), 'binary', 'hex');
//var secretB = dhB.computeSecret(dhA.getPublicKey(), 'binary', 'hex');


//console.log('Secret A: ' + secretA);
//console.log('Secret B: ' + secretB);

//console.log(secretA === secretB ? 'SUCCESS' : 'FAILURE');
               
console.log('Listening for HTTPS/TLS connections on port ' + port);

