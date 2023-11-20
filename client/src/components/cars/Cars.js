import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../../redux/features/cars/carSlice';
import Loader from '../loader/loader';

const Cars = () => {
    const dispatch = useDispatch();
    const { cars, isLoading } = useSelector(state => state.cars);

    // Calculer les valeurs maximales de kilométrage et de prix à partir des voitures
    const maxKilometers = Math.max(...cars.map(car => car.kilometers));
    const maxPrice = Math.max(...cars.map(car => car.price));

    const [filters, setFilters] = useState({
        kilometerMin: 0,
        kilometerMax: maxKilometers,
        priceMin: 0,
        priceMax: maxPrice
    });

    useEffect(() => {
        dispatch(getCars());
    }, [dispatch]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: parseInt(value, 10) });
    };

    const resetFilter = (filterType) => {
        setFilters({
            ...filters,
            [`${filterType}Min`]: 0,
            [`${filterType}Max`]: filterType === 'kilometer' ? maxKilometers : maxPrice
        });
    };

    const filteredCars = cars.filter(car => {
        return (
            car.kilometers >= filters.kilometerMin &&
            car.kilometers <= filters.kilometerMax &&
            car.price >= filters.priceMin &&
            car.price <= filters.priceMax
        );
    });

    return (
        <>
            {isLoading ? <Loader /> :
                <CarsWrapper>
                    <Container>
                        <h2>Voitures d'occasion</h2>
                        <CarFilters>
                            {/* Filtre de kilométrage */}
                            <Filter>
                                <label htmlFor="kilometer-range">Kilométrage</label>
                                <input
                                    type="range"
                                    name="kilometerMin"
                                    min="0"
                                    max={maxKilometers}
                                    value={filters.kilometerMin}
                                    onChange={handleFilterChange}
                                />
                                <div className='basis'>
                                    <Output id="kilometer-range">{`${filters.kilometerMin}km - ${filters.kilometerMax}km`}</Output>
                                    <ResetBtn onClick={() => resetFilter('kilometer')}>Réinitialiser</ResetBtn>
                                </div>
                            </Filter>
                            {/* Filtre de prix */}
                            <Filter>
                                <label htmlFor="price-range">Prix</label>
                                <input
                                    type="range"
                                    name="priceMin"
                                    min="0"
                                    max={maxPrice}
                                    value={filters.priceMin}
                                    onChange={handleFilterChange}
                                />
                                <div className='basis'>
                                    <Output id="price-range">{`${filters.priceMin}€ - ${filters.priceMax}€`}</Output>
                                    <ResetBtn onClick={() => resetFilter('price')}>Réinitialiser</ResetBtn>
                                </div>
                            </Filter>
                        </CarFilters>
                        <CarGrid>
                            {filteredCars.map((car, index) => (
                                <CarItem key={index}>
                                    <img src={car.image_path} alt={car.model} />
                                    <h3>{car.model}</h3>
                                    <p>Kilométrage: <span>{car.kilometers} km</span></p>
                                    <p>Prix: <span>{car.price}€</span></p>
                                    <button className="details-btn">Se renseigner</button>
                                </CarItem>
                            ))}
                        </CarGrid>
                    </Container>
                </CarsWrapper>
            }
        </>
    );
};

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
