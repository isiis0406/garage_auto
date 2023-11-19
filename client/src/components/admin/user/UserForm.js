import React, { useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from 'styled-components';

const UserForm = (
    {
        user,
        setUser,
        handleInputChange,
        handleSaveUser,
        labelButton
    }) => {


    return (
        <Wrapper>
            <AddUser>
                <Card>
                    <form onSubmit={handleSaveUser}>

                        <Group>
                            <Label>Nom complet :</Label>
                            <StyledInput
                                type="text"
                                name="name"
                                value={user?.name}
                                onChange={handleInputChange}
                            />
                        </Group>
                        <Group>
                            <Label>Email :</Label>
                            <StyledInput
                                type="email"
                                name="email"
                                value={user?.email}
                                onChange={handleInputChange}
                            />
                        </Group>
                        <Group>
                            <Label>rôle :</Label>
                            <StyledSelect
                                name="role"
                                value={user?.role}
                                onChange={handleInputChange}
                            >
                                <option value="admin">Admin</option>
                                <option value="employee">Employé</option>
                            </StyledSelect>
                        </Group>
                

                      

                        <ButtonContainer>
                            <Button type="submit">{labelButton}</Button>
                        </ButtonContainer>
                    </form>
                </Card>
            </AddUser>
        </Wrapper>
    );
};

export default UserForm;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    padding: 2rem;
    background-color: #f4f4f4; 
    
    .quill {
        height: 120px;
        margin-bottom: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        .ql-editor {
            padding: 1rem;
        }
    }
`;

const AddUser = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto; 
    padding: 2rem;
    background-color: #fff; 
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
    border-radius: 8px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
`;

const Group = styled.div`
    margin-bottom: 1rem; 
    width: 100%;
`;
const GroupLine = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-right: 1.2rem;
    gap: 1rem;
    margin-bottom: 1rem; 
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    color: #333; /* Couleur du texte */
    font-weight: bold;
`;

const StyledInput = styled.input`
    width: 95%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;


`;
const StyledSelect = styled.select`
    width: 95%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
`;



const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 4rem;
`;

const Button = styled.button`
    background-color: #2e6378; /* Couleur principale */
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #1e4a5f; /* Assombrir au survol */
    }
`;


