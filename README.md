###Sonos-Geckoboard Integration
#Displays the currently playing song in a text widget on your Geckoboard.

This is one of the first projects I've hacked on. It works for me but I probably won't have much of a clue if it doesn't for you. Consider it public domain. Most of the heavy lifting is done by jishi's excellent [node sonos http api](http://github.com/jishi/node-sonos-http-api).

To use, edit the widgetkey, api_key and pushURL variables in sonosfetch/sonosfetch.js to correspond with those required by your geckoboard widget. The start.sh bash script starts the http server then begins making the api calls on another process. Make it executable then run it from terminal: 

    $ chmod +x start.sh
    $ ./start.sh

Make sure you're running the script on a computer on the same network as your Sonos. Tested and working with node v4.2.3 and npm v2.14.7
