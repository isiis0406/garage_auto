import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createMessage } from '../../redux/features/messages/messageSlice';

const initialState = {
    name: '',
    phone: '',
    email: '',
    message: ''
}

const Contact = () => {
    const dispatch = useDispatch();
    const [contact, setContact] = useState(initialState);
    const navigate = useNavigate();

    const { name, phone, email, message } = contact;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };
    const handleSendMessage = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            phone,
            email,
            message
        }
        const result = await dispatch(createMessage(formData));
        if (!result.error) {
            navigate('/');
        }
       

    }



    return (
        <ContactWrapper>
            <Container>
                <h2>Nous contacter</h2>
                <ContactForm onSubmit={handleSendMessage} id="contact-form">
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nom complet"
                        required 
                        onChange={handleInputChange}
                        />
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Téléphone"
                        required 
                        onChange={handleInputChange}
                        />
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        required 
                        onChange={handleInputChange}

                        />
                    <TextArea
                        id="message"
                        name="message"
                        placeholder="Message...."
                        rows="6"
                        required
                        onChange={handleInputChange}
                        />
                    <SubmitButton type="submit">Envoyer</SubmitButton>
                </ContactForm>
            </Container>
        </ContactWrapper>
    );
}


export default Contact;

// Styled Components

const ContactWrapper = styled.section`
    background-color: #1e4a5f;
    padding: 2rem 0;
    text-align: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: #fff;
`;

const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: 0 auto;
`;

const Input = styled.input`
    width: 100%;
    margin-bottom: 1rem;
    outline: none;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    width: 100%;
    margin-bottom: 1rem;
    outline: none;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: vertical;
`;

const SubmitButton = styled.button`
    background-color: #2e6378;
    color: #fff;
    width: 40%;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #357998;
    }
`;

