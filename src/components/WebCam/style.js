import styled from "styled-components";

export const StyledWebCam = styled.div`
  margin: auto;
  width: 100%;
  gap: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .webcam {
    width: 100%;
    max-height: 80vh; /* Adjust as needed to fit within the viewport */
    object-fit: cover; /* Ensures the video covers the container */
  }
`;
