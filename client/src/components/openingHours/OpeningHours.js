import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getOpeningHours, selectIsLoading, selectOpeningHours } from '../../redux/features/openingHours/openingHoursSlice';

const OpeningHours = () => {
    const dispatch = useDispatch();
    const openingHours = useSelector(selectOpeningHours);
    const isLoading = useSelector(selectIsLoading);
    useEffect(() => {
        dispatch(getOpeningHours());
    }, [dispatch])

    return (
        <OpeningHoursWrapper>
            <Container>
                <h2>Horaires d'ouverture</h2>
                <Hours>
                    <HoursTable>
                        <thead>
                            <tr>
                                <th>Jour</th>
                                <th>Matin</th>
                                <th>Après-midi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openingHours && openingHours?.map((hour, index) => (
                                <tr key={index}>
                                    <td>{hour.day}</td>
                                    <td>{hour.morning_hours}</td>
                                    <td>{hour.afternoon_hours}</td>
                                </tr>
                            ))}
                        
                            
                        </tbody>
                    </HoursTable>
                </Hours>
            </Container>
        </OpeningHoursWrapper>
    )
}

export default OpeningHours;

// Styled Components

const OpeningHoursWrapper = styled.section`
    background-color: #1e4a5f;
    color: #fff;
    padding: 2rem;
    text-align: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Hours = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
`;

const HoursTable = styled.table`
    padding: 3rem;
    border-collapse: collapse;
    width: 60%;
    color: #000;

    th, td {
        padding: 0.5rem;
        border: 1px solid #444;
        background-color: #fff;
    }

    th {
        background-color: #222;
        color: #fff;
    }

    @media screen and (max-width: 768px) {
        font-size: 0.8rem;
    }
`;
