import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';
import AuthForm from '../../components/auth/AuthForm';
import Input from '../../components/auth/Input';
import AuthButton from '../../components/auth/AuthButton';
import { customErrorToast } from '../../components/toast/customToat';
import { Card, FullHeightContainer, PrimaryButton, StyledForm, StyledInput, StyledLink } from '../../components/auth/partials/StyledComponents';

const initialState = {
  password: '',
  confirmPassword: '',

}

function ResetPassword() {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { password, confirmPassword } = formData

  const { resetToken } = params;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  const handleReset = async (e) => {
    e.preventDefault();

    //Validation
    if (!password || !confirmPassword) {
      return customErrorToast('dark', 'Tous les champs sont requis');
    }
    if (password.length < 6) {
      return customErrorToast('dark', 'Le mot de passe doit contenir au moins 6 caractères');
    }
    if (password !== confirmPassword) {
      return customErrorToast('dark', 'Les mots de passes ne correspondent pas');
    }
    const userData = {
      password,
      confirmPassword
    }
    try {
      setIsLoading(true);
      await resetPassword(userData, resetToken);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
    }
  }




  return (
    <FullHeightContainer>
      <Card>
        <StyledForm onSubmit={handleReset}>
          <StyledInput
            type='password'
            placeholder='Mot de passe'
            required
            name='password'
            value={password}
            onChange={handleInputChange}

          />
          <StyledInput
            type='password'
            placeholder='Confirmer le mot de passe'
            required
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleInputChange}

          />
          <PrimaryButton
            type='submit'
            label='Enregistrer'
          >
            Enregistrer
          </PrimaryButton>
        </StyledForm>
        <StyledLink to="/login" className="right-link">Se connecter</StyledLink>
      </Card>

    </FullHeightContainer>
  );
}

export default ResetPassword;

