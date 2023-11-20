import React, { useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from 'styled-components';

const testimonialForm = (
    {
        testimonial,
        setTestimonial,
        handleInputChange,
        handleSaveTestimonial,
        labelButton
    }) => {


    return (
        <Wrapper>
            <AddCar>
                <h2>Partager son avis</h2>
                <Card>
                    <form onSubmit={handleSaveTestimonial}>



                        <GroupLine>
                            <Group>
                                <Label>Nom :</Label>
                                <StyledInput
                                    type="text"
                                    name="name"
                                    value={testimonial?.name}
                                    onChange={handleInputChange}
                                />

                            </Group>
                            <Group>
                                <Label>Email :</Label>
                                <StyledInput
                                    type="email"
                                    name="email"
                                    value={testimonial?.email}
                                    onChange={handleInputChange}
                                />
                            </Group>
                        </GroupLine>
                        <Group>
                            <Label>Note :</Label>
                            <StyledSelect
                                name="rating"
                                value={testimonial?.rating}
                                onChange={handleInputChange}
                            >
                                <option value="1">★</option>
                                <option value="2">★★</option>
                                <option value="3">★★★</option>
                                <option value="4">★★★★</option>
                                <option value="5">★★★★★</option>
                            </StyledSelect>
                        </Group>
                        <Group>
                            <Label>Avis :</Label>
                            <ReactQuill
                                theme="snow"
                                value={testimonial?.content}
                                onChange={value => setTestimonial({ ...testimonial, content: value })}
                                modules={testimonialForm.modules}
                                formats={testimonialForm.formats}
                                className='quill'
                            />
                        </Group>

                        <ButtonContainer>
                            <Button type="submit">{labelButton}</Button>
                        </ButtonContainer>
                    </form>
                </Card>
            </AddCar>
        </Wrapper>
    );
};

testimonialForm.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["clean"],
    ],
};
testimonialForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
];

export default testimonialForm;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    padding: 2rem;
    
    .quill {
     
        margin-bottom: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        .ql-editor {
            padding: 1rem;
        }
    }
`;

const AddCar = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto; 
    padding: 2rem;
    background-color: #fff; 
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
    border-radius: 8px;
    h2 {
        margin-bottom: 2rem;
        text-align: center;

    }
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
    width: 48%;
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


