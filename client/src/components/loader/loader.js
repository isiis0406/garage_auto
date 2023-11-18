import React from "react";
import loaderImg from "../../assets/loading.gif";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Loader = () => {
  return ReactDOM.createPortal(
    <Wrapper>
      <LoaderContainer>
        <img src={loaderImg} alt="Loading..." />
      </LoaderContainer>
    </Wrapper>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <CenteredContainer>
      <img src={loaderImg} alt="Loading..." />
    </CenteredContainer>
  );
};

export default Loader;

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #13191A;

  z-index: 1000;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
