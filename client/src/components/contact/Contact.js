import React from 'react';
import styled from 'styled-components';

const Contact = () => {
    return (
        <ContactWrapper>
            <Container>
                <h2>Nous contacter</h2>
                <ContactForm id="contact-form">
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nom complet"
                        required />
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Téléphone"
                        required />
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        required />
                    <TextArea
                        id="message"
                        name="message"
                        placeholder="Message...."
                        rows="6"
                        required />
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

