import styled from "styled-components";
import heroImage from "../../assets/images/hero.jpg";

const Hero = () => {
    return (
        <HeroContainer>
            <section id="hero">
                <div class="hero-text">
                    <h1>Bienvenue au Garage Auto</h1>
                    <p>Votre solution fiable pour tous les besoins automobiles.</p>
                </div>
            </section>
        </HeroContainer>
    )
}

export default Hero
const HeroContainer = styled.div`
background: url(${heroImage}) no-repeat center center/cover;
height: 70vh;
position: relative;
display: flex;
justify-content: center;
align-items: center;
color: white;
text-align: center;
/* Ajout d'un overlay assombri */
background-color: rgba(0, 0, 0, 0.3);
background-blend-mode: darken; /* Mode de fusion pour assombrir l'image */

.hero-text {
    max-width: 600px; 
    padding: 20px;
}

.hero-text h1 {
    font-size: 2.5em;
    margin-bottom: 0.5em;
}

@media screen and (max-width: 768px) {
    .hero-text h1 {
        font-size: 2em;
    }
}


`