import React from 'react';
import styled from 'styled-components';

const Testimonials = () => {
    return (
        <TestimonialsWrapper>
            <Container>
                <h2>Avis de nos clients</h2>
                <TestimonialsGrid>

                    <TestimonialItem>
                        <TestimonialRating>★★★★★</TestimonialRating>
                        <TestimonialContent>"J'ai été impressionné par le professionnalisme et le service rapide. Je recommande sans hésiter!"</TestimonialContent>
                        <TestimonialAuthor>Martine Lavoie</TestimonialAuthor>
                    </TestimonialItem>
                    <TestimonialItem>
                        <TestimonialRating>
                            ★★★★☆
                        </TestimonialRating>
                        <TestimonialContent>"Service de qualité et conseils honnêtes. Un léger retard dans la
                            livraison, mais dans l'ensemble satisfait."</TestimonialContent>
                        <TestimonialAuthor>Bernard Dupuis</TestimonialAuthor>
                    </TestimonialItem>

                    <TestimonialItem>
                        <TestimonialRating>
                            ★★★★★
                        </TestimonialRating>
                        <TestimonialContent>"Des prix compétitifs et un accueil toujours chaleureux. Mon garage
                            de confiance depuis des années!"</TestimonialContent>
                        <TestimonialAuthor>Sophie Garnier</TestimonialAuthor>
                    </TestimonialItem>

                    <TestimonialItem>
                        <TestimonialRating>
                            ★★★☆☆
                        </TestimonialRating>
                        <TestimonialContent>"Bons services dans l'ensemble mais l'attente a été plus longue que
                            prévue. Bonne communication cependant."</TestimonialContent>
                        <TestimonialAuthor>Lucas Martin</TestimonialAuthor>
                    </TestimonialItem>

                    <TestimonialItem>
                        <TestimonialRating>★★★★★</TestimonialRating>
                        <TestimonialContent>"Le personnel est non seulement compétent mais aussi très aimable.
                            Ils ont pris le temps de m'expliquer le problème de mon véhicule en détail."</TestimonialContent>
                        <p class="testimonial-author">Emilie Rostand</p>
                    </TestimonialItem>

                    <TestimonialItem>
                        <TestimonialRating>★★★★☆</TestimonialRating>
                        <TestimonialContent>"Après plusieurs visites, je suis toujours aussi satisfait des
                            services proposés. Un endroit de confiance pour l'entretien de ma voiture."</TestimonialContent>
                        <p class="testimonial-author">François Duret</p>
                    </TestimonialItem>
                </TestimonialsGrid>
                <Actions>
                    <Button>Voir tous</Button>
                    <Button>Donner son avis</Button>
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
    
    text-align: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TestimonialsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
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

const Button = styled.button`
    padding: 10px 20px;
    background-color: #1e4a5f; 
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2e6378; 
    }
`;

