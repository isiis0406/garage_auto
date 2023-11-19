import React, { useEffect } from 'react';
import styled from "styled-components";
import peugeot from "../../assets/images/cars/peugeot_308.jpg";
import renault from "../../assets/images/cars/Renault-Clio-2018.jpg";
import volkswagen from "../../assets/images/cars/Volkswagen Golf - 2019.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../../redux/features/cars/carSlice';
import Loader from '../loader/loader';

// Methode pour raccourcir le texte
const shortenText = (text, n) => {
    if (text.length > n) {
        return text.substring(0, n).concat("...");
    }
    return text;
};


const Cars = () => {
    const dispatch = useDispatch();

    const { cars, isLoading, message } = useSelector(state => state.cars);
    useEffect(() => {
        dispatch(getCars());
    }, [dispatch])
    return (
        <>
            {isLoading && <Loader />}
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
                        { cars && cars.map((car, index) => (
                            <CarItem key={index}>
                                <img src={car.image_path} alt={car.model} />
                                <h3>{car.model}</h3>
                                <p>Kilométrage: <span>{car.kilometers} km</span></p>
                                <p>Prix: <span>{car.price}€</span></p>
                                <button class="details-btn">Se renseigner</button>

                            </CarItem>
                        ))
                        }
                        
                    </CarGrid>
                </Container>
            </CarsWrapper>

        </>


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
    .details-btn {
        background-color: #2e6378;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 5px;
        font-size: 0.8rem;
        margin: 1rem;
        transition: background-color 0.3s ease-in-out;
    }
`;
