// import styled from "styled-components";

// export const StyledHomePage = styled.div`
//   display: flex;
//   flex-direction: column;

//   .card-container {
//     display: flex;
//     flex: 1;
//     align-items: center;
//     justify-content: space-evenly;
//     gap: 60px;
//   }
// `;

import styled from "styled-components";

export const StyledHomePage = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }

  .left-side {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    position: relative;

    @media (max-width: 768px) {
      padding: 1rem;
      order: 2;
    }
  }

  .right-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
    height: 100%;

    @media (max-width: 768px) {
      padding: 2rem 1rem;
      align-items: center;
      text-align: center;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    max-height: 500px;
    

    @media (max-width: 768px) {
      max-height: 300px;
    }
  }

  h1 {
    font-size: 3.5rem;
    color:rgb(0, 0, 0);
    margin-bottom: 1.5rem;
    font-weight: 700;
    line-height: 1.2;

    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .typewriter {
    color: rgb(0, 116, 249);
    font-weight: 700;
    border-right: 3px solid #4cc9f0;
    padding-right: 5px;
    display: inline-block;
  }

  .subtitle {
    color:rgb(0, 0, 0);
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
    max-width: 80%;
    line-height: 1.6;

    @media (max-width: 768px) {
      max-width: 100%;
      font-size: 1rem;
    }
  }

  .cta-button {
    padding: 15px 40px;
    font-size: 1.1rem;
    color: white;
    background: linear-gradient(135deg,rgb(56, 199, 242),rgb(0, 116, 249));
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    // box-shadow: 0 2px 15px rgba(76, 201, 240, 0.4);
    width: fit-content;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(76, 201, 240, 0.6);
    }

    &:active {
      transform: translateY(1px);
    }

    @media (max-width: 768px) {
      width: 100%;
      max-width: 300px;
    }
  }

  /* Glow effect for image container */
  .image-container {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background: radial-gradient(circle, rgba(76,201,240,0.2) 0%, rgba(76,201,240,0) 70%);
      z-index: -1;
    }
  }
`;