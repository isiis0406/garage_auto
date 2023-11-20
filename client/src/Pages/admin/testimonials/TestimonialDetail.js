import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getService } from '../../../redux/features/services/serviceSlice';
import styled from 'styled-components';
import Loader from '../../../components/loader/loader'; // Assurez-vous d'avoir un composant Loader
import AdminLayout from '../../../components/admin/adminLayout/AdminLayout';
import DOMPurify from 'dompurify';
import { getCar } from '../../../redux/features/cars/carSlice';
import { getTestimonial } from '../../../redux/features/testimonials/testimonialSlice';


function TestimonialDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { selectedTestimonial, isLoading, isError, message } = useSelector((state) => state.testimonials);

    useEffect(() => {
        dispatch(getTestimonial(id));
    }, [dispatch, id]);

    if (isLoading) return <Loader />;
    if (isError) return <Message>Erreur : {message}</Message>;

    return (
        <AdminLayout title="Détail du service">
            <ServiceDetailContainer>
                <Title> {selectedTestimonial.name} </Title>

                <ServiceInfo>
                    <p>Email : {selectedTestimonial.email}</p>
                    <p>Statut : {selectedTestimonial.status}</p>

                    <p>Note :

                        {selectedTestimonial.rating === 1 ? (
                            <span>★</span>
                        ) : selectedTestimonial.rating === 2 ? (
                            <span>★★</span>
                        ) : selectedTestimonial.rating === 3 ? (
                            <span>★★★</span>
                        ) : selectedTestimonial.rating === 4 ? (
                            <span>★★★★</span>
                        ) : selectedTestimonial.rating === 5 ? (
                            <span>★★★★★</span>
                        ) : (
                            ''
                        )}
                    </p>
                   
                    <p>Contenu :</p>
                    <Description dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedTestimonial.content) }}></Description>
                </ServiceInfo>
            </ServiceDetailContainer>
        </AdminLayout>
    );
}

export default TestimonialDetail;

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
