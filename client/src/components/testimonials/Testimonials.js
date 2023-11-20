import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTestimonials } from '../../redux/features/testimonials/testimonialSlice';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

// Methode pour raccourcir le texte
const shortenText = (text, n) => {
    if (text.length > n) {
        return text.substring(0, n).concat("...");
    }
    return text;
};


const filterApprovedTestimonials = (testimonials) => {
    return testimonials.filter(testimonial => testimonial.status === 'approuvé');
}

const Testimonials = () => {
    const [approvedTestimonials, setApprovedTestimonials] = useState([]);

    const dispatch = useDispatch();
    
    
    
    useEffect(() => {
        dispatch(getTestimonials());
    }, [dispatch])
    
    const { testimonials, isLoading, message } = useSelector(state => state.testimonials);
    console.log(filterApprovedTestimonials(testimonials));
    return (
        <TestimonialsWrapper id='testimonials'>
            <Container>
                <h2>Avis de nos clients</h2>
                <TestimonialsGrid>

                    {testimonials && filterApprovedTestimonials(testimonials).map((testimonial, index) => (
                        <TestimonialItem key={index}>
                            <TestimonialRating>
                                {testimonial?.rating === 1 ? (
                                    <span>★</span>
                                ) : testimonial?.rating === 2 ? (
                                    <span>★★</span>
                                ) : testimonial?.rating === 3 ? (
                                    <span>★★★</span>
                                ) : testimonial?.rating === 4 ? (
                                    <span>★★★★</span>
                                ) : testimonial?.rating === 5 ? (
                                    <span>★★★★★</span>
                                ) : (
                                    ''
                                )}
                            </TestimonialRating>
                            {testimonial?.content && <TestimonialContent dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(shortenText(testimonial?.content, 100)) }}></TestimonialContent>}
                            <TestimonialAuthor>{testimonial?.name}</TestimonialAuthor>
                        </TestimonialItem>
                    ))}

                </TestimonialsGrid>
                <Actions>
                    <Button to='/add-testimonial'>Donner son avis</Button>
                </Actions>
            </Container>
        </TestimonialsWrapper>
    )
}

export default Testimonials;

// Styled Components

const TestimonialsWrapper = styled.section`
    background-color: #f7f7f7;
    padding: 2rem;
    max-width: 100%;
    text-align: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TestimonialsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 1rem;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const TestimonialItem = styled.div`
    background-color: #fff;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TestimonialRating = styled.div`
    color: #ffc107; /* Couleur jaune pour les étoiles */
    font-size: 1.5rem; /* Taille des étoiles */
    margin-bottom: 1rem;
`;

const TestimonialContent = styled.p`
    font-style: italic;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 1rem;
`;

const TestimonialAuthor = styled.p`
    font-weight: bold;
    color: #000;
`;

const Actions = styled.div`
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
`;

const Button = styled(Link)`
    padding: 10px 20px;
    background-color: #1e4a5f; 
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;

    &:hover {
        background-color: #2e6378; 
    }
`;

