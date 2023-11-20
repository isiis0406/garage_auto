import React, { useState } from 'react';
import styled from 'styled-components';

const OpeningHoursForm = ({
    hours,
    setHours,
    handleSubmit,
    handleInputChange
}) => {






    return (
        <FormWrapper onSubmit={handleSubmit}>
            <Table>
                <thead>
                    <tr>
                        <th>Jour</th>
                        <th>Matin</th>
                        <th>Après-midi</th>
                    </tr>
                </thead>
                <tbody>
                    {hours.map((hour, index) => (
                        <tr key={index}>
                            <td>{hour.day}</td>
                            <td>
                                <input
                                    type="text"
                                    value={hour.morning_hours}
                                    onChange={(e) => handleInputChange(index, "morning_hours", e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={hour.afternoon_hours}
                                    onChange={(e) => handleInputChange(index, "afternoon_hours", e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>


            </Table>
            <SubmitButton type="submit">Enregistrer les horaires</SubmitButton>
        </FormWrapper>
    );
};

export default OpeningHoursForm;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    th {
        background-color: #2e6378;
        color: white;
    }

    td {
        input {
            width: 90%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    }
`;

const SubmitButton = styled.button`
    background-color: #2e6378;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #1e4a5f;
    }
`;
