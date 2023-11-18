import styled from 'styled-components';
import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";



const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Content>
        {children}
      </Content>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  flex: 1; // Prend tout l'espace restant
  // display: flex;
  // flex-direction: column; // Pour aligner Header, le contenu et Footer verticalement
`;

const Content = styled.div`
  // flex: 1; // Prend tout l'espace restant entre Header et Footer
  // min-height: 80vh; // Votre règle actuelle
`;