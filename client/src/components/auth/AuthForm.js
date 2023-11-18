import React from 'react'
import styled from 'styled-components';
import { StyledForm } from './partials/StyledComponents';

function AuthForm({ children,h2, onSubmit }) {
    return (
        <div>
            <Container>
                <h2>{h2}</h2>
                <StyledForm onSubmit={onSubmit}>
                    {children}
                </StyledForm>
            </Container>
        </div>
    )
}

export default AuthForm

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #313C40;

    h2 {
        margin-bottom: 20px;
        color: #F7F2E9;
        text-align: center;
        font-weight: 400;
        font-size: 20px;
    }

    .links a {
        text-decoration: none;
        color: #F7F2E9;
        font-size: 12px;
    }
    .links a:hover {
        text-decoration: underline;
    }
    ::placeholder {
        color: #F7F2E9;
    }
`;

