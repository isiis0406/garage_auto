import React, { useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from 'styled-components';

const ServiceForm = (
    {
        service,
        setService,
        imagePreview,
        handleInputChange,
        handleImageChange,
        handleSaveService,
        labelButton
    }) => {


    return (
        <Wrapper>
            <AddService>
                <Card>
                    <form onSubmit={handleSaveService}>


                        <Group>
                            <Label>Titre :</Label>
                            <StyledInput
                                type="text"
                                name="title"
                                value={service?.title}
                                onChange={handleInputChange}
                            />
                        </Group>
                        <Group>
                            <Label>Image :</Label>
                            <code className="format">
                                Formats supportés : jpg, jpeg, png
                            </code>
                            <StyledInput
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={(e) => {handleImageChange(e)}}
                            />
                            {imagePreview && (
                                <ImagePreview>
                                    <img src={imagePreview} alt="Aperçu" />
                                </ImagePreview>
                            )}
                        </Group>

                        <Group>
                            <Label>Description :</Label>
                            <ReactQuill
                                theme="snow"
                                value={service?.description}
                                onChange={value => setService({ ...service, description: value })}
                                modules={ServiceForm.modules}
                                formats={ServiceForm.formats}
                                className='quill'
                            />
                        </Group>

                        <ButtonContainer>
                            <Button type="submit">{labelButton}</Button>
                        </ButtonContainer>
                    </form>
                </Card>
            </AddService>
        </Wrapper>
    );
};

ServiceForm.modules = {
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
ServiceForm.formats = [
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

export default ServiceForm;

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

const AddService = styled.div`
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
    margin-bottom: 1rem; /* Espace entre les champs */
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


const ImagePreview = styled.div`
    margin-top: 1rem;
    img {
        width: 100%;
        max-width: 400px;
        height: auto;
        border-radius: 4px;
    }
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


