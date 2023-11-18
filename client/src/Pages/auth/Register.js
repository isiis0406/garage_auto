import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { registerUser, validateEmail } from '../../services/authService';
import {useDispatch} from "react-redux"

//Import redux actions
import {SET_LOGIN, SET_NAME} from "../../redux/features/auth/authSlice"
import Loader from '../../components/loader/loader';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const {name, email, password, confirmPassword} = formData

const handleInputChange = (e) => {
  const {name, value} = e.target;
  setFormData({...formData,[name]:value})
}
const handleRegister = async (e) => {
  e.preventDefault();
  if(!name || !email || !password){
    return toast.error('Tous les champs sont requis');
  }
 
  if(!validateEmail(email)){
    return toast.error('Veillez saisir une adresse email valide')
  }
  if(password.length < 6){
    return toast.error('Le mot de passe doit contenir au moins 6 caractères');
  }
  if(password !== confirmPassword){
    return toast.error('Les mots de passes ne correspondent pas');
  }
  const userData = {
    name,
    email,
    password
  }
  setIsLoading(true);
  try {
    const data = await registerUser(userData);
    await dispatch(SET_LOGIN(true));
    await dispatch(SET_NAME(data.name));
    
    setIsLoading(false);
    navigate("/dashboard");
    
  } catch (error) {
    setIsLoading(false);
  }
}
  return (
    <Container>
      <FormContainer>
        {isLoading && <Loader/>}
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type='text'
            placeholder='Nom'
            required
            name='name'
            value={name}
            onChange={handleInputChange}
          />
          <input
            type='text'
            placeholder='Email'
            required
            name='email'
            value={email}
            onChange={handleInputChange}
          />
          <input
            type='password'
            placeholder='Mot de passe'
            required
            name='password'
            value={password}
            onChange={handleInputChange}

          />
          <input
            type='password'
            placeholder='Confirmer le mot de passe'
            required
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleInputChange}

          />
          <button type='submit'>Register</button>
            <div className="links">
              <Link to='/login'>Déjà inscrit</Link>
            </div>
        </form>
      </FormContainer>
    </Container>
  );
}

export default Register;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
    }

    button {
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }

    .links {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
      margin-top: 10px;
    }

    .links a {
      text-decoration: none;
      color: #021122; /* Couleur par défaut des liens */
    }

   
  }
`;