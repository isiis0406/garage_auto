import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
padding: 0.75rem;
border: none;
background-color: #3381a5;
color: white;
cursor: pointer;
border-radius: 10px;
font-size: 1rem;
width: 100%;

&:hover {
    background-color: #357998;
}

`;

const AuthButton = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

export default AuthButton;
