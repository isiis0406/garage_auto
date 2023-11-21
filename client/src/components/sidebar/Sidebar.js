import React from 'react';
import styled from 'styled-components';
import { FaHome, FaCar, FaUsers, FaEnvelope, FaStar, FaClock } from 'react-icons/fa';
import { GrServices } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo1.png';
import { useSelector } from 'react-redux';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { ShowOnAdmin } from '../protect/HiddenLink';
const Sidebar = () => {
    useRedirectLoggedOutUser('/login');
    // Récupération du rôle de l'utilisateur

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const userRole = useSelector(state => state.auth.user.role);

    return (
        <SidebarContainer>
            <SidebarHead>
                <Logo src={logo} />
            </SidebarHead>
            <SidebarMenu>
                <SidebarLink to="/">
                    <FaHome /> Accueil
                </SidebarLink>
                <SidebarLink to="/admin/services">
                    <GrServices /> Service
                </SidebarLink>
                <SidebarLink to="/admin/cars">
                    <FaCar /> Voitures
                </SidebarLink>
                <ShowOnAdmin>
                    <SidebarLink to="/admin/add-opening-hours">
                        <FaClock /> Horaires
                    </SidebarLink>

                    <SidebarLink to="/admin/users">
                        <FaUsers /> Utilisateurs
                    </SidebarLink>
                </ShowOnAdmin>

                <SidebarLink to="/admin/messages">
                    <FaEnvelope /> Messages
                </SidebarLink>
                <SidebarLink to="/admin/testimonials">
                    <FaStar /> Avis
                </SidebarLink>
                {/* Ajoutez d'autres liens ici si nécessaire */}
            </SidebarMenu>
        </SidebarContainer>
    );
};

export default Sidebar;

const SidebarContainer = styled.aside`
    background: #2e6378;
    width: 150px;
    position: fixed;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SidebarMenu = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const SidebarHead = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    height: 50px;
    width: 100%;
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
   
`;

const Logo = styled.img`
    width: 100px;
    height: 80px;
    object-fit: contain;
`;

const SidebarLink = styled(Link)`
    display: flex;
    align-items: center;
    height: 30px;
    color: white;
    text-decoration: none;
    padding: 10px;
    &:hover {
        background: #1e4a5f;
        cursor: pointer;
    }
    svg {
        margin-right: 10px;
    }
`;
