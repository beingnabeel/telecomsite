import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const VideoButton = ({ smallFeedEl }) => {
  const callStatus = useSelector((state) => state.callStatus);
  const streams = useSelector((state) => state.streams);
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const startStopVideo = () => {
    // console.log("Sanity check");
    // first check if the video is enabled, if so disabled
    // second, check if the video is disabled, if so enable.
    // thirdly, check to see if we have media, if so, start the stream.
    console.log(callStatus.haveMedia);
    if (callStatus.haveMedia) {
      // we have the media! show the feed.
      smallFeedEl.current.srcObject = streams.localStream.stream;
      //   add tracks to the existing peerConnection.
    } else {
      // lastly, it is possible, we don't have the media, wait for the media then start the stream.
      setPendingUpdate(true);
    }
  };
  useEffect(() => {
    // this useeffect will run if the peding update changes to true.
    if (pendingUpdate && callStatus.haveMedia) {
      console.log("Pending update succeeded.");
      setPendingUpdate(false); // switch back to false
      smallFeedEl.current.srcObject = streams.localStream.stream;
    }
  }, [pendingUpdate, callStatus.haveMedia]);
  return (
    <div className="button-wrapper video-button d-inline-block">
      <i className="fa fa-caret-up choose-video"></i>
      <div className="button camera" onClick={startStopVideo}>
        <i className="fa fa-video"></i>
        <div className="btn-text">
          {callStatus.video === "display" ? "Stop" : "Start"} Video
        </div>
      </div>
    </div>
  );
};
export default VideoButton;
