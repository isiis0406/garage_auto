import React from 'react';
import styled from 'styled-components';

const OpeningHours = () => {
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
                            <tr>
                                <td>Lundi</td>
                                <td>08:45 - 12:00</td>
                                <td>14:00 - 18:00</td>
                            </tr>
                            <tr>
                                <td>Mardi</td>
                                <td>08:45 - 12:00</td>
                                <td>14:00 - 18:00</td>
                            </tr>
                            <tr>
                                <td>Mercredi</td>
                                <td>08:45 - 12:00</td>
                                <td>14:00 - 18:00</td>
                            </tr>
                            <tr>
                                <td>Jeudi</td>
                                <td>08:45 - 12:00</td>
                                <td>14:00 - 18:00</td>
                            </tr>
                            <tr>
                                <td>Vendredi</td>
                                <td>08:45 - 12:00</td>
                                <td>14:00 - 18:00</td>
                            </tr>
                            <tr>
                                <td>Samedi</td>
                                <td>08:45 - 12:00</td>
                                <td>Fermé</td>
                            </tr>
                            <tr>
                                <td>Dimanche</td>
                                <td colSpan="2">Fermé</td>
                            </tr>
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
