import styled from "styled-components"
import pneu from "../../assets/images/services/changement_pneus.jpg";
import moteur from "../../assets/images/services/reparation_moteur.jpg";
import vidange from "../../assets/images/services/vidange_huile.jpg";
import diagnostic from "../../assets/images/services/diagnostic_electronic.jpg";
import climatisation from "../../assets/images/services/climatisation.jpg";
import peinture from "../../assets/images/services/peinture.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getServices } from "../../redux/features/services/serviceSlice.js";
import DOMPurify from "dompurify";
import Loader from "../loader/loader";

// Methode pour raccourcir le texte
const shortenText = (text, n) => {
    if (text.length > n) {
        return text.substring(0, n).concat("...");
    }
    return text;
};


const Services = () => {
    const dispatch = useDispatch();

    const { services, isLoading, message } = useSelector(state => state.services);
    useEffect(() => {
        dispatch(getServices());
    }, [dispatch])
    return (
        <>
            {isLoading && <Loader />}
            <ServicesWrapper>

                <h2>Nos Services</h2>
                <ServiceGrid class="service-grid">
                    {
                        services && services.map((service, index) => (
                            <ServiceItem key={index}>
                                <img src={service.image_path} alt={service.title} />
                                <h3>{service.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(shortenText(service.description, 100)) }}></p>
                            </ServiceItem>
                        ))
                    }

                </ServiceGrid>
            </ServicesWrapper>
        </>
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