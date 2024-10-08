import peerConfiguration from "./stunServers";

const createPeerConnection = () => {
  return new Promise(async (resolve, reject) => {
    const peerConnection = await new RTCPeerConnection(peerConfiguration);
    // rtc peerconnection is the connection to the peer
    // we may need more than one this time!
    // we pass it the config object, which is the stun server.
    // it will get us ICE candidates
    const remoteStream = new MediaStream();
    peerConnection.addEventListener("signalingstatechange", (e) => {
      console.log("Signaling state change.");
      console.log(e);
    });
    peerConnection.addEventListener("icecandidate", (e) => {
      console.log("Found ice candidate...");
      if (e.candidate) {
        // emit to socket server.
      }
    });
    resolve({
      peerConnection,
      remoteStream,
    });
  });
};
export default createPeerConnection;
