import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../components/loader/loader.js'; // Assurez-vous d'avoir un composant Loader
import DOMPurify from 'dompurify';
import { getCar } from '../../redux/features/cars/carSlice';
import Header from '../../components/header/Header.js';
import Layout from '../layout/Layout.js';

function CarDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { selectedCar, isLoading, isError, message } = useSelector((state) => state.cars);
    useEffect(() => {
        dispatch(getCar(id));
    }, [dispatch, id]);

    if (isLoading) return <Loader />;
    if (isError) return <Message>Erreur : {message}</Message>;

    return (
         <Layout>
               <ServiceDetailContainer>
                <Title>{selectedCar.brand} {selectedCar.model}</Title>

                <ServiceImage src={selectedCar.image_path} alt={selectedCar.brand} />
                <ServiceInfo>
                    <p>{selectedCar.price} euros</p>
                    <p>{selectedCar.kilometers} km</p>
                    
                    <Description dangerouslySetInnerHTML={{ __html : DOMPurify.sanitize(selectedCar.description) }}></Description>
                </ServiceInfo>
                <Link to={`/home/car-detail/${selectedCar.id}`} className="details-btn">Se renseigner</Link>

            </ServiceDetailContainer>
         </Layout>
    );
}

export default CarDetail;

const ServiceDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const ServiceImage = styled.img`
    max-width: 40%;
    height: auto;
    border-radius: 8px;
`;

const ServiceInfo = styled.div`
    margin-top: 20px;
`;

const Title = styled.h1`
    color: #2e6378;
`;

const Description = styled.p`
    color: #333;
    font-size: 1rem;
`;

const Message = styled.p`
    color: red;
    font-size: 1.2rem;
    text-align: center;
`;
