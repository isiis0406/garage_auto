import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Récupère l'année actuelle

  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <FooterMap>
            <h3>Nous trouver</h3>
            <GoogleMap>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2647.08270816876!2d-4.394966524630521!3d48.43575237127795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4816b05fee30f851%3A0x85834ee4d26e24a5!2s123%20Rue%20de%20Paris%2C%2029490%20Guipavas!5e0!3m2!1sfr!2sfr!4v1700088050007!5m2!1sfr!2sfr"
                width="800"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title='Carte Google Maps'
              ></iframe>
            </GoogleMap>
          </FooterMap>
        </FooterContent>
        <FooterBottom>
          <p>&copy; <span id="year">{currentYear}</span> Garage V Parrot. Tous droits réservés.</p>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;

// Styled Components

const FooterWrapper = styled.footer`
    background-color: #333;
    color: #fff;
    padding: 1rem 0;
    font-size: 0.9rem;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const FooterContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1rem;
`;

const FooterMap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    text-align: center;
    justify-content: center;
`;

const GoogleMap = styled.div`
    iframe {
      
        width: 800px;
        height: 300px;
        border: none;
    }
`;

const FooterBottom = styled.div`
    text-align: center;
    margin-top: 1rem;
    border-top: 1px solid #444;
    padding-top: 1rem;

    span {
        font-weight: bold;
        color: green;
      }
`;
