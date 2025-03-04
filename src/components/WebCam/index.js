// import React from "react";
// import Webcam from "react-webcam";
// import { StyledWebCam } from "./style";

// const WebCam = ({ onCapture }) => {
//   const webcamRef = React.useRef(null);

//   const capture = React.useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     onCapture(imageSrc);
//   }, [webcamRef, onCapture]);

//   return (
//     <StyledWebCam>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/png"
//         className="webcam"
//       />
//       <button onClick={capture}>Capture</button>
//     </StyledWebCam>
//   );
// };

// export default WebCam;
import React from "react";
import Webcam from "react-webcam";
import { StyledWebCam } from "./style";

const WebCam = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    // Send the image to the backend
    await fetch("http://localhost:3003/save-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageSrc }),
    });
  }, [webcamRef]);

  return (
    <StyledWebCam>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        className="webcam"
      />
      <button onClick={capture}>Capture</button>
    </StyledWebCam>
  );
};

export default WebCam;
