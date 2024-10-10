// this function job is to update all PeerConnection (addTracks) and update redux callStatus
// here the reason we are needing streams is because we are gonna interact with the peerConnection and we need dispatch because we need to update redux callstatus.

import updateCallStatus from "../../redux-elements/actions/updateCallStatus";

const startLocalVideoStream = (streams, dispatch) => {
  //   console.log("sanity check");
  const localStream = streams.localStream;
  for (const s in streams) {
    // s is the key, and remember key is the who property, ex: remote1, remote2, local1
    if (s !== "localStream") {
      // we don't addTracks to the localStream.
      const curStream = streams[s];
      //   addTracks to all peerConnection.
      localStream.stream.getVideoTracks().forEach((t) => {
        // curStream.peerConnection.addTrack(t, curStream.stream);
        // here inside of peerconnection.addtrack I have the current stream track which means it's the other, it's the other users that's essentially the same as saying remoteConnection back in our old example and that's not what we want, this needs to be the local feed because we're adding it to the peerConnection, but it's the local side
        curStream.peerConnection.addTrack(t, streams.localStream.stream);
      });
      //   update redux callstatus.
      //   here the update call status is part of redux it's not react.
      //   dispatch needs to be inside component but the updateCallStatus doesn't need to be inside the component.
      dispatch(updateCallStatus("video", "enabled"));
    }
  }
};
export default startLocalVideoStream;
