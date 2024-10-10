const ActionButtonCaretDropDown = ({
  defaultValue,
  changeHandler,
  deviceList,
  type,
}) => {
  let dropDownEl;
  if (type === "video") {
    dropDownEl = deviceList.map((vd) => (
      <option key={vd.deviceId} value={vd.deviceId}>
        {vd.label}
      </option>
    ));
  } else if (type === "audio") {
    const audioInputEl = [];
    const audioOutputEl = [];
    deviceList.forEach((d, i) => {
      if (d.kind === "audioinput") {
        audioInputEl.push(
          <option key={d.deviceId} value={d.deviceId}>
            {d.label}
          </option>
        );
      } else if (d.kind === "audiooutput") {
        audioOutputEl.push(
          <option key={d.deviceId} value={d.deviceId}>
            {d.label}
          </option>
        );
      }
    });
    audioInputEl.unshift(<optgroup label="Input Devices" />);
    audioOutputEl.unshift(<optgroup label="Output Devices" />);
    dropDownEl = audioInputEl.concat(audioOutputEl);
  }

  return (
    <div className="caret-dropdown" style={{ top: "-25px" }}>
      {/* we can't get callstatus here because it's a reducer so we will fix it, the problem is all three of them(audio, video, participants) is gonna use some different default value so it's probably better to pass them as props. */}
      <select
        // defaultValue={callStatus.videoDevice}
        defaultValue={defaultValue}
        // onChange={changeVideoDevice}
        onChange={changeHandler}
      >
        {/* <option>Hello</option>
            <option>Goodbye</option> */}
        {/* here in the below line videoDeviceList is replaced with deviceList */}
        {dropDownEl}
      </select>
    </div>
  );
};
export default ActionButtonCaretDropDown;
