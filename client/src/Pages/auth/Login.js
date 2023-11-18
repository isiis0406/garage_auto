import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, validateEmail } from '../../services/authService';
import { toast } from 'react-toastify';
import { SET_LOGIN, SET_NAME, SET_USER, selectIsLoggedInd, selectUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/loader';
import Input from '../../components/auth/Input';
import AuthButton from '../../components/auth/AuthButton';
import AuthForm from '../../components/auth/AuthForm';
import { customErrorToast } from '../../components/toast/customToat';
import { Card, FullHeightContainer, PrimaryButton, StyledForm, StyledInput, StyledLink } from '../../components/auth/partials/StyledComponents';
const initialState = {
  email: '',
  password: '',

}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formData;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    //Validations
    if (!email || !password) {
      return customErrorToast('light', 'Tous les champs sont requis');
    }

    if (!validateEmail(email)) {
      return customErrorToast('light', 'Veillez saisir une adresse email valide');
    }
    if (password.length < 6) {
      return customErrorToast('light', 'Le mot de passe doit contenir au moins 6 caractères');
    }
    const userData = {
      email,
      password
    }
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      if (data) {
        await dispatch(SET_LOGIN(true));
        await dispatch(SET_NAME(data.name));
        await dispatch(SET_USER(data));
        setIsLoading(false);
        navigate('/')

      } else {
        setIsLoading(false);
      }


    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <FullHeightContainer>
      <Card>
        
      {isLoading && <Loader />}
      {/* <h2>Login</h2> */}
      <StyledForm onSubmit={handleLogin}>
                    <StyledInput
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={handleInputChange}
                    />
                    <StyledInput
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <PrimaryButton type="submit">Se connecter</PrimaryButton>
                </StyledForm>
                <StyledLink to="/forgotPassword" className="right-link">Mot de passe oublié </StyledLink>

      </Card>

    </FullHeightContainer>
  );
}

export default Login;
const Wrapper = styled.div`
  .toast-message {
    background: darkblue;
    color: #fff;
    font-size: 20px;
    width: 34vw;
    padding: 30px 20px;
  }
`