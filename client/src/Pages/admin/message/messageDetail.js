import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getService } from '../../../redux/features/services/serviceSlice';
import styled from 'styled-components';
import Loader from '../../../components/loader/loader'; // Assurez-vous d'avoir un composant Loader
import AdminLayout from '../../../components/admin/adminLayout/AdminLayout';
import DOMPurify from 'dompurify';
import { getCar } from '../../../redux/features/cars/carSlice';
import { getMessage } from '../../../redux/features/messages/messageSlice';


function MessageDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { selectedMessage, isLoading, isError, message } = useSelector((state) => state.messages);

    useEffect(() => {
        dispatch(getMessage(id));
    }, [dispatch, id]);

    if (isLoading) return <Loader />;
    if (isError) return <Message>Erreur : {message}</Message>;

    return (
        <AdminLayout title="Détail du service">
            <ServiceDetailContainer>
                <Title>{selectedMessage.name} </Title>

                <ServiceInfo>
                    <p>Email : {selectedMessage.email} </p>
                    <p>Téléphone : {selectedMessage.phone} </p>
                    <p>Archivé : {selectedMessage.archived ? 'Oui' : 'Non'}</p>

                    <Description dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedMessage.message) }}></Description>
                </ServiceInfo>
            </ServiceDetailContainer>
        </AdminLayout>
    );
}

export default MessageDetail;

const ServiceDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
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
