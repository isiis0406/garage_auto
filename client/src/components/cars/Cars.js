import React from 'react';
import styled from "styled-components";
import peugeot from "../../assets/images/cars/peugeot_308.jpg";
import renault from "../../assets/images/cars/Renault-Clio-2018.jpg";
import volkswagen from "../../assets/images/cars/Volkswagen Golf - 2019.jpg";

const Cars = () => {
    return (
        <CarsWrapper>
            <Container>
                <h2>Voitures d'occasion</h2>
                <CarFilters>
                    <Filter>
                        <label htmlFor="kilometer-range">Kilométrage</label>
                        <input type="range" id="kilometer-min" name="kilometer-min" min="0" max="300000" value="0" />
                        <div className='basis'>
                            <Output id="kilometer-range">0km - 300000km</Output>
                            <ResetBtn>Réinitialiser</ResetBtn>
                        </div>
                    </Filter>
                    <Filter>
                        <label htmlFor="price-range">Prix</label>
                        <input type="range" id="price-min" name="price-min" min="0" max="100000" value="0" />
                        <div className='basis'>
                            <Output id="price-range">0€ - 100000€</Output>
                            <ResetBtn>Réinitialiser</ResetBtn>
                        </div>
                    </Filter>
                </CarFilters>
                <CarGrid>
                    <CarItem>
                        <img src={peugeot} alt="Peugeot 308 - 2017" />
                        <h3>Peugeot 308 - 2017</h3>
                        <p>Kilométrage: <span>50,000 km</span></p>
                        <p>Prix: <span>15,000€</span></p>
                    </CarItem>
                    <CarItem>
                        <img src={renault} alt="Renault Clio - 2018" />
                        <h3>Renault Clio - 2018</h3>
                        <p>Kilométrage: <span>30,000 km</span></p>
                        <p>Prix: <span>12,500€</span></p>
                    </CarItem>
                    <CarItem>
                        <img src={volkswagen} alt="Volkswagen Golf - 2019" />
                        <h3>Volkswagen Golf - 2019</h3>
                        <p>Kilométrage: <span>20,000 km</span></p>
                        <p>Prix: <span>18,000€</span></p>
                    </CarItem>
                </CarGrid>
            </Container>
        </CarsWrapper>
    )
}

export default Cars;

// Styled Components

const CarsWrapper = styled.section`
    background-color: #f4f4f4;
    padding: 1rem 0;
`;

const Container = styled.div`
    width: 80%;
    margin: 0 auto;
    text-align: center;
`;

const CarFilters = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
    gap: 60px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Filter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    input[type="range"] {
        width: 100%;
        margin: 10px 0;
    }
    .basis{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
    }
`;

const Output = styled.output`
    font-size: 0.9rem;
    padding: 5px;
    font-weight: bold;
    color: #1e4a5f;
`;

const ResetBtn = styled.button`
    padding: 5px 10px;
    background-color: #1e4a5f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #357998;
    }
`;

const CarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 1rem 0;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const CarItem = styled.div`
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-2px);
    }

    img {
        max-width: 100%;
        height: 200px;
        object-fit: cover;
    }

    h3 {
        margin: 10px 0;
    }

    p {
        color: #555;
        font-size: 0.9rem;
    }
    span {
        font-weight: bold;
        color: #1e4a5f;
    }
`;
