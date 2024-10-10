// so this get devices is a utility function that fetches all available devices.
// both video and audio
const getDevices = () => {
  return new Promise(async (resolve, reject) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    // console.log(devices);
    const videoDevices = devices.filter((d) => d.kind === "videoinput");
    const audioOutputDevices = devices.filter((d) => d.kind === "audiooutput");
    const audioInputDevices = devices.filter((d) => d.kind === "audioinput");
    // so here we will send back these 3 properties in resolve so whoever will need it can use them
    resolve({
      videoDevices,
      audioOutputDevices,
      audioInputDevices,
    });
  });
};
export default getDevices;
