import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getService } from '../../../redux/features/services/serviceSlice';
import styled from 'styled-components';
import Loader from '../../../components/loader/loader'; // Assurez-vous d'avoir un composant Loader
import AdminLayout from '../../../components/admin/adminLayout/AdminLayout';
import DOMPurify from 'dompurify';
import { getCar } from '../../../redux/features/cars/carSlice';


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
        <AdminLayout title="Détail du service">
            <ServiceDetailContainer>
                <Title>{selectedCar.brand} {selectedCar.model}</Title>

                <ServiceImage src={selectedCar.image_path} alt={selectedCar.brand} />
                <ServiceInfo>
                    <p>{selectedCar.price} euros</p>
                    <p>{selectedCar.kilometers} km</p>
                    
                    <Description dangerouslySetInnerHTML={{ __html : DOMPurify.sanitize(selectedCar.description) }}></Description>
                </ServiceInfo>
            </ServiceDetailContainer>
        </AdminLayout>
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
