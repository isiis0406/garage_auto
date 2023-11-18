import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getService } from '../../../redux/features/services/serviceSlice';
import styled from 'styled-components';
import Loader from '../../../components/loader/loader'; // Assurez-vous d'avoir un composant Loader
import AdminLayout from '../../../components/admin/adminLayout/AdminLayout';
import DOMPurify from 'dompurify';


function ServiceDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { selectedService, isLoading, isError, message } = useSelector((state) => state.services);

    useEffect(() => {
        dispatch(getService(id));
    }, [dispatch, id]);

    if (isLoading) return <Loader />;
    if (isError) return <Message>Erreur : {message}</Message>;

    return (
        <AdminLayout title="Détail du service">
            <ServiceDetailContainer>
                <Title>{selectedService.title}</Title>

                <ServiceImage src={selectedService.image_path} alt={selectedService.title} />
                <ServiceInfo>
                    <Description dangerouslySetInnerHTML={{ __html : DOMPurify.sanitize(selectedService.description) }}></Description>
                </ServiceInfo>
            </ServiceDetailContainer>
        </AdminLayout>
    );
}

export default ServiceDetail;

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
