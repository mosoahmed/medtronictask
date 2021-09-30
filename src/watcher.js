let peerConnection;
//config STUN/TURN servers config
const config = {
    iceServers: [
        {
            "urls": "stun:stun.l.google.com:19302",
        },
    ]
};

//coonect user using his host
const socket = io.connect(window.location.origin);
const video = document.querySelector("video");

//set remote Description when we get offer from broadcaster
//also set our local description sdp
socket.on("offer", (id, description) => {
    peerConnection = new RTCPeerConnection(config);
    peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
            //fire answer event to reply to broadcaster offer
            socket.emit("answer", id, peerConnection.localDescription);
        });
    peerConnection.ontrack = event => {
        video.srcObject = event.streams[0];
    };
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            socket.emit("candidate", id, event.candidate);
        }
    };
});

//when we get ice candidate we add it to our peer
socket.on("candidate", (id, candidate) => {
    peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch(e => console.error(e));
});

//fire watcher event when we get connect event
socket.on("connect", () => {
    socket.emit("watcher");
});

//fire watcher event when we get broadcaster event
socket.on("broadcaster", () => {
    socket.emit("watcher");
});

//close connection when client close window
window.onunload = window.onbeforeunload = () => {
    socket.close();
    peerConnection.close();
};

