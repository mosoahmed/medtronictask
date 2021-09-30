# Video/Audio Broadcasting Demo

this is a quick demo about using webrtc on nodejs server to allow Broadcasting video/audio by Broadcaster and allow
clients to watch it in real time

## Getting started

### Starting the application

Start the application using Node:

```bash
# Install dependencies for server
npm install

# Run the server
node src/server.js
```

### Testing the application

The application should now be running on your localhost:8080 and you test it by connecting to localhost:8080

you can click on Broadcaster in home page to act as Broadcaster

after that, then you can open new tab in same browser or any other browser to try to act as client using same url
localhost:8080 but by clicking on client button which you should get the video that is streamed from the broadcaster.

## explaining lifecycle of demo

1. we run the server
2. you visit at broadcasteer
3. we create rtc peer connection and save id of broadcaster
4. we find and set ice candidate
5. after previewing the video we wait for any client to watch
6. when client visit watching page we start our client cycle
7. we connect client to server
8. we notify server that new client is connect which notify broadcaster
9. broadcaster will init offer and send it to watcher
10. watch get the offer and init answer and send it to broadcaster
11. both broacaster and client/watcher have sdp info that which makes it ready for both to connect and preview real time
    connection
