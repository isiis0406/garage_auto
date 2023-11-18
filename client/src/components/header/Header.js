import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/authService';
import { SET_LOGIN, SET_NAME, RESET_USER } from '../../redux/features/auth/authSlice';
import { ShowOnLogin, ShowOnLogout } from '../protect/HiddenLink';
import { HeaderContainer, HeaderContent, Logo, WelcomeAndLogout, LogoutButton, LoginButton } from './StyledHeader.js';
import logo from '../../assets/images/logo1.png';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    dispatch(SET_NAME(''));
    dispatch(RESET_USER());
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <Link to='/'>
            <img src={logo} alt='Logo' />
          </Link>
        </Logo>
        <WelcomeAndLogout>
          <ShowOnLogin>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#opening-hours">Horaires</a></li>
              <li><a href="#used-cars">Voitures</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#testimonials">Témoignages</a></li>
            </ul>
            <LogoutButton onClick={handleLogout}>Déconnexion</LogoutButton>
          </ShowOnLogin>
          <ShowOnLogout>
          <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#opening-hours">Horaires</a></li>
              <li><a href="#used-cars">Voitures</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#testimonials">Témoignages</a></li>
            </ul>
            <LoginButton to='/login'>Se connecter</LoginButton>
          </ShowOnLogout>
        </WelcomeAndLogout>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
