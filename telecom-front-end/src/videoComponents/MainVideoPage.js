import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./videoComponents.css";
import axios from "axios";
import CallInfo from "./CallInfo";
import ChatWindow from "./ChatWindow";
import ActionButtons from "./ActionButtons";
import addStream from "../redux-elements/actions/addStream";
import { useDispatch } from "react-redux";
import createPeerConnection from "../utilities/createPeerConnection";
import socket from "../utilities/socketConnection";
import updateCallStatus from "../redux-elements/actions/updateCallStatus";

const MainVideoPage = () => {
  const dispatch = useDispatch();
  // get query string finder hook
  const [searchParams, setSearchParams] = useSearchParams();
  const [apptInfo, setApptInfo] = useState({});
  const smallFeedEl = useRef(null); // this is a react reference to a dom element, so we can interact with it the react way.
  const largeFeedEl = useRef(null);

  useEffect(() => {
    // fetch the user media
    const fetchMedia = async () => {
      const constraints = {
        video: true, // must have one constraint just don't show it yet.
        audio: false,
      };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        dispatch(updateCallStatus("haveMedia", true)); // update our call status reducer to know that we have the media
        // dispatch will send this function to the redux dispatcher so all reducers are notified
        // we send 2 args the who, and the stream
        dispatch(addStream("localStream", stream));
        // this will return a promise so we need await
        const { peerConnection, remoteStream } = await createPeerConnection();
        // we don't know who we are talking to yet.
        dispatch(addStream("remote1", remoteStream, peerConnection));
        // we have a peerconnection... let's make an offer
        //Except it's not time yet
        // SDP= information about the feed, and we have no tracks
        // socket.emit...
      } catch (err) {
        console.log(err);
      }
    };
    fetchMedia();
  }, []);
  useEffect(() => {
    // grab the token var out of the query string.
    const token = searchParams.get("token");
    console.log(token);
    const fetchDecodedToken = async () => {
      const resp = await axios.post("https://localhost:9000/validate-link", {
        token,
      });
      // here we are passing the token as the object
      console.log(resp.data);
      setApptInfo(resp.data);
    };
    fetchDecodedToken();
  }, []);
  return (
    <div className="main-video-page">
      <div className="video-chat-wrapper">
        {/* Div to hold our main video, our own video and our chat window  */}
        <video
          id="large-feed"
          ref={largeFeedEl}
          autoPlay
          controls
          playsInline
        ></video>
        <video
          id="own-feed"
          ref={smallFeedEl}
          autoPlay
          controls
          playsInline
        ></video>
        {apptInfo.professionalsFullName ? (
          <CallInfo apptInfo={apptInfo} />
        ) : (
          <></>
        )}
        <ChatWindow />
      </div>
      <ActionButtons smallFeedEl={smallFeedEl} />
    </div>
  );
};

export default MainVideoPage;
