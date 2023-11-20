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
  z-index: 2;
`;

export const WelcomeAndLogout = styled.div`
  display: flex;
  align-items: center;

  // Cachez le menu sur les appareils mobiles par défaut
  @media (max-width: 768px) {
    
    flex-direction: column;
    position: absolute;
    top: 70px; // Hauteur de votre Header
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(46, 99, 120, 0.9);
    
    padding: 1rem;
    z-index: 1;

    // Transition pour la propriété transform
    transition: transform 0.3s ease-in-out;

    // Utilisez transform pour gérer l'ouverture/fermeture
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};

    
    ul {
      flex-direction: column;
      align-items: center;
      margin: 0;
      gap: 1rem;
      
    }
    ul li {
        margin: 0;
    }

    ul li a {
          font-size: 2rem;
          padding: 1rem 0;
          
        }
      
    }
  }

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
  @media (max-width: 768px) {
    display: none;
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
export const MobileBarsMenuIcon = styled.div`
  display: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;
export const MobileCloseMenuIcon = styled.div`
  display: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;