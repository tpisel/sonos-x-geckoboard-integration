//dependencies
var request = require ('request');
var http = require('http');

//geckoboard
var widgetkey = 'yourwidgetkeyhere';
var api_key = 'yourapikeyhere';
var pushURL = 'https://push.geckoboard.com/v1/send/yourpushurlhere';

//the http api url
var httpoptions = {
host: 'localhost',
path: '/state',
port: '5005',
method: 'GET'
};

var output;
var message;

sonosRead = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log('The Sonos state has been read');
    output = JSON.parse(str);
    
    songTitle   = output.currentTrack.title;
    songArtist  = output.currentTrack.artist;

    //text to display
    displaytext = '<center>'+songArtist+'<br><h1><em>'+songTitle+'</em></h1></center>';
    if (output.playerState != 'PLAYING') {
      displaytext += '<br><center>PAUSED</center>';
    }

    message = {
      api_key: api_key,
      data: {
        item: [
          {
            text: displaytext,
            type: 0
          }
        ]
      }
    }

    console.log('the song playing is ' + songTitle);

    setTimeout(sendoff(), 2500);
  });
}

callitup = function(){
    http.request(httpoptions, sonosRead).end();
}

sendoff = function(){
  console.log(JSON.stringify(message));
  request.post(pushURL).form(JSON.stringify(message));
  console.log('message sent');
}

//call repeatedly
var keepRunning = setInterval(function() {callitup()},5000);

//to end can use clearInterval(keepRunning)

















