import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../sidebar/Sidebar.js';

const AdminLayout = ({ children, title }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Header>{title}</Header>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout;

const LayoutContainer = styled.div`
  display: flex;

`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: 150px;
`;

const Header = styled.h1`
  margin-bottom: 20px;
  text-align: center;
    font-size: 1.5rem;
    color: #2e6378;
    font-weight: 800;
`;
