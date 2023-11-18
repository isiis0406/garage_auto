import AdminLayout from '../../../components/admin/adminLayout/AdminLayout.js';
import styled from 'styled-components';
import ReusableTable from '../../../components/table/ReusableTable.js';
import logo from '../../../assets/images/logo1.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectIsLoggedInd } from '../../../redux/features/auth/authSlice.js';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser.js';
import { getServices, selectIsLoading, selectServices } from '../../../redux/features/services/serviceSlice.js';
import Loader from '../../../components/loader/loader.js';
const Services = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIsLoggedInd);
    // Récupérer les états globaux depuis le redux
    const { services, isLoading, isError, message } = useSelector((state) => state.services);




    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getServices());
            if (isError) {
                console.log(message);
            }
        }
        getServices();
    }, [isError, message, dispatch, isLoggedIn]);

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Titre', accessor: 'title' },
        { header: 'Description', accessor: 'description' },
        { header: 'Photo', accessor: 'image_path' },

    ];

    return (
        <>
            {isLoading && <Loader />}
            {services &&
                <AdminLayout title="Gestion des Services">
                    <Action to="/admin/add-service">Ajouter un Service</Action>
                    <ReusableTable columns={columns} data={services} />
                </AdminLayout>}
        </>
    );
};

export default Services;

const Action = styled(Link)`
    color: #fff;
    background-color: #2e6378;
    padding: 5px 10px;
    border-radius: 5px;
    text-decoration: none;
    float: right;
    margin-bottom: 20px;
    &:hover {
        background-color: #1e4150;
    }
`;

