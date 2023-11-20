import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/authService';
import { SET_LOGIN, SET_NAME, RESET_USER } from '../../redux/features/auth/authSlice';
import { ShowOnLogin, ShowOnLogout } from '../protect/HiddenLink';
import { HeaderContainer, HeaderContent, Logo, WelcomeAndLogout, LogoutButton, LoginButton, MobileBarsMenuIcon, MobileCloseMenuIcon } from './StyledHeader.js';
import logo from '../../assets/images/logo1.png';
import { FaBars, FaTimes } from 'react-icons/fa';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        {!isMenuOpen ?
          <MobileBarsMenuIcon onClick={toggleMenu}><FaBars /></MobileBarsMenuIcon> :
          <MobileCloseMenuIcon onClick={toggleMenu}><FaTimes /></MobileCloseMenuIcon>}

        <WelcomeAndLogout isOpen={isMenuOpen}>
          <ShowOnLogin>
            <ul>
              <li><a href="#services" onClick={toggleMenu}>Services</a></li>
              <li><a href="#cars" onClick={toggleMenu}>Voitures</a></li>
              <li><a href="#opening-hours" onClick={toggleMenu}>Horaires</a></li>
              <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
              <li><a href="#testimonials" onClick={toggleMenu}>Témoignages</a></li>
            </ul>
            <LogoutButton onClick={handleLogout}>Déconnexion</LogoutButton>
          </ShowOnLogin>

          <ShowOnLogout>
            <ul>
              <li><a onClick={toggleMenu} href="#services">Services</a></li>
              <li><a href="#cars">Voitures</a></li>
              <li><a href="#opening-hours">Horaires</a></li>
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
