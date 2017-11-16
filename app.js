var express = require('express');
var cfenv = require('cfenv');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
	client.on('event',function(data){
        console.log('Client sent info: ', data.message);
    });
	client.on('disconnect',function(){});
});

app.use(express.static(__dirname + '/public'));

var appEnv = cfenv.getAppEnv();

server.listen(appEnv.port, '0.0.0.0', function() {
    console.log("server starting on " + appEnv.url);
});
