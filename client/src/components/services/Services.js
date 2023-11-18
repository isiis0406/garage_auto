import styled from "styled-components"
import pneu from "../../assets/images/services/changement_pneus.jpg";
import moteur from "../../assets/images/services/reparation_moteur.jpg";
import vidange from "../../assets/images/services/vidange_huile.jpg";
import diagnostic from "../../assets/images/services/diagnostic_electronic.jpg";
import climatisation from "../../assets/images/services/climatisation.jpg";
import peinture from "../../assets/images/services/peinture.jpg";

const Services = () => {
    return (
        <ServicesWrapper>

            <h2>Nos Services</h2>
            <ServiceGrid class="service-grid">
                <ServiceItem >
                    <img src={moteur} alt="Réparation de moteur" />
                    <h3>Réparation de moteur</h3>
                    <p>Expertise complète sur les moteurs pour garantir la performance de votre véhicule.</p>
                </ServiceItem>
                <ServiceItem >
                    <img src={pneu} alt="Changement de pneus" />
                    <h3>Changement de pneus</h3>
                    <p>Services de montage, équilibrage et remplacement de pneus pour tous types de véhicules.</p>
                </ServiceItem>
                <ServiceItem >
                    <img src={vidange} alt="Vidange d'huile" />
                    <h3>Vidange d'huile</h3>
                    <p>Service rapide et efficace de changement d'huile pour maintenir votre moteur en bonne santé.</p>
                </ServiceItem>
                <ServiceItem >
                    <img src={diagnostic} alt="Diagnostic électronique" />
                    <h3>Diagnostic électronique</h3>
                    <p>Diagnostics avancés pour identifier et résoudre les problèmes électroniques.</p>
                </ServiceItem>
                <ServiceItem >
                    <img src={climatisation} alt="Entretien de climatisation" />
                    <h3>Entretien de climatisation</h3>
                    <p>Services de maintenance et de réparation de systèmes de climatisation pour un confort optimal.
                    </p>
                </ServiceItem>
                <ServiceItem >
                    <img src={peinture} alt="Peinture et carrosserie" />
                    <h3>Peinture et carrosserie</h3>
                    <p>Travaux de peinture professionnels et réparations de carrosserie pour tous les types de
                        véhicules.</p>
                </ServiceItem>
            </ServiceGrid>
        </ServicesWrapper>
    )
}

export default Services

const ServicesWrapper = styled.section`
    background-color: #1e4a5f;    
    padding: 50px 20px;
    text-align: center;
    color: #ffffff;

    h2 {
        margin-bottom: 3rem;
    }
`;

const ServiceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const ServiceItem = styled.div`
    padding: 20px;
    text-align: center;

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    h3 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 0.8rem;
    }
`;