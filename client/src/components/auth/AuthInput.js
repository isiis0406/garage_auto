import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 0.75rem;
    border: 1px solid #ddd;
    outline: none;
    border-radius: 10px;
    margin-bottom: 1rem;
`;

const AuthInput = ({ type, placeholder }) => {
    return <StyledInput type={type} placeholder={placeholder} />;
};

export default AuthInput;
