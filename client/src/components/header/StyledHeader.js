import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const HeaderContainer = styled.header`
  background-color: #2e6378;
  color: #fff;
  padding: 0.8rem 1.8rem;
  height: 70px;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  a {
    img {
      height: 80px; // Ajustez selon la taille souhaitée
    }
  }
`;

export const WelcomeAndLogout = styled.div`
  display: flex;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin-right: 20px;

    li {
      margin: 0 10px;

      a {
        color: #fff;
        font-size: 1rem;
        text-decoration: none;
        transition: all 0.3s ease-in;

        &:hover {
          color: #aeaeae;
        }
      }
    }
  }
`;

export const WelcomeMessage = styled.div`
  color: #fff;
  margin-right: 1rem;
`;

export const LogoutButton = styled.button`
  background-color: rgb(166, 75, 0);
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease-in;

  &:hover {
    
    color: #aeaeae;
  }
`;
export const LoginButton = styled(Link)`
  background-color: rgb(166, 75, 0);
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease-in;
  text-decoration: none;

  &:hover {
      
      color: #c4c4c4;
    }
`;