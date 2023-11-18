import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const FullHeightContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('./images/hero.jpg') no-repeat center center/cover;
  background-color: rgba(0, 0, 0, 0.3);
  background-blend-mode: darken;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 4rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled.input`
  padding: 0.75rem;
  width: 100%;
  border: 1px solid #ddd;
  outline: none;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

export const PrimaryButton = styled.button`
  padding: 0.75rem;
  border: none;
  margin-bottom: 1rem;
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
export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #357998;
    font-size: 15px;
    margin-top: 1rem;

    `;