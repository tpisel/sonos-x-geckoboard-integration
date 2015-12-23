#first make executable with $ chmod +x start.sh
#then run with ./start

#need to start two processes, one a little after the other.
#the addresses need to be made absolute when executing on startup

cd ./sonosserver
npm start &
sleep 20s
cd ../sonosfetch
node sonosfetch



