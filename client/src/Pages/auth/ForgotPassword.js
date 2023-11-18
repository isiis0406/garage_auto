import React, { useState } from 'react';
import { forgotPassword, validateEmail } from '../../services/authService';
import Loader from '../../components/loader/loader';
import { customErrorToast } from '../../components/toast/customToat';
import { Card, FullHeightContainer, PrimaryButton, StyledForm, StyledInput, StyledLink } from '../../components/auth/partials/StyledComponents';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return customErrorToast('light', 'Veillez saisir une adresse email');
    }
    if (!validateEmail(email)) {
      return customErrorToast('light', 'Veillez saisir une adresse email valide');
    }
    const userData = {
      email
    }
    setIsLoading(true);
    await forgotPassword(userData);
    setIsLoading(false);
  }

  return (
    <FullHeightContainer>
      {isLoading && <Loader />}
      <Card>
      <StyledForm onSubmit={handleForgot}>
        <h2>Mot de passe oublié</h2>
        <StyledInput
          type='text'
          placeholder='Email'
          required
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PrimaryButton 
        type='submit'
        label='Modifier'
        >Modifier</PrimaryButton>
        <div className="links">
          <StyledLink to="/login" className="right-link">Se connecter</StyledLink>
        </div>
      </StyledForm>
      </Card>
    </FullHeightContainer>
  );
}

export default ForgotPassword;
