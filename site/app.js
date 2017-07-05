var session = require('express-session');
var express = require('express');
var config = require('config');


var app = express();
app.use(express.static('views'));
app.set('view engine', 'ejs');


var host = '127.0.0.1';
var port = 8081;
if (config.has('host')) {
    host = config.get('host');
}
if (config.has('port')) {
    port = config.get('port');
}

app.get('/', function(request, response) {
    response.render('home.ejs');
});

app.listen(port, function(){
    console.log('Listening at https://%s:%s', host, port);
});


