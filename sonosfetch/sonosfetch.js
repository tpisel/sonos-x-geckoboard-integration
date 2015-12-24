//dependencies
var request = require ('request');
var http = require('http');

//geckoboard--add your details here:
var widgetkey = 'yourwidgetkeyhere';
var api_key = 'yourapikeyhere';
var pushURL = 'https://push.geckoboard.com/v1/send/yourpushurlhere';

//reading state from the http-api server
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

    //Message to Display on the Geckoboard
    displaytext = '<center>'+songArtist+'<br><h1><em>'+songTitle+'</em></h1></center>';
    if (output.playerState != 'PLAYING') {
      displaytext += '<br><center>PAUSED</center>';
    }

    //Structure for JSON package
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

    //Wait until Sonos state has chance to be read before sending to board
    setTimeout(sendoff(), 2500);
  });
}

callitup = function(){
    http.request(httpoptions, sonosRead).end();
}

sendoff = function(){
  console.log(JSON.stringify(message));
  request.post(pushURL).form(JSON.stringify(message));
  console.log('JSON sent to Geckoboard');
}

//call repeatedly to keep board up to date
var keepRunning = setInterval(function() {callitup()},5000);

//to end can use clearInterval(keepRunning)

















