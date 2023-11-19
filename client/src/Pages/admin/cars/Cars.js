import AdminLayout from '../../../components/admin/adminLayout/AdminLayout.js';
import styled from 'styled-components';
import ReusableTable from '../../../components/table/ReusableTable.js';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectIsLoggedInd } from '../../../redux/features/auth/authSlice.js';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser.js';
import Loader from '../../../components/loader/loader.js';
import { useNavigate } from 'react-router-dom';
import { deleteCar, getCars } from '../../../redux/features/cars/carSlice.js';
const Cars = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedInd);
    // Récupérer les états globaux depuis le redux
    const { cars, isLoading, isError, message } = useSelector((state) => state.cars);
    
    const handleView = async (id) => {
        await navigate(`/admin/car-detail/${id}`)
    };
    const handleEdit = async (id) => {
        await navigate(`/admin/edit-car/${id}`)
    };
    const handleDeleteCar = async (id) => {   
        
       const result = await dispatch(deleteCar(id));
        if(!result.error){
            await dispatch(getCars());
            navigate('/admin/cars');
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getCars());
            if (isError) {
                console.log(message);
            }
        }
    }, [isError, message, dispatch, isLoggedIn]);


    const columns = [
        { header: 'Marque', accessor: 'brand' },
        { header: 'Modèle', accessor: 'model' },
        { header: 'Année de sortie', accessor: 'release_year' },
        { header: 'Prix (euros)', accessor: 'price' },
        { header: 'Kilométrage', accessor: 'kilometers' },
        { header: 'Photo', accessor: 'image_path' },

    ];

    return (
        <>
            {isLoading && <Loader />}
            {cars &&
                <AdminLayout title="Gestion des voitures">
                    <Action to="/admin/add-car">Ajouter une voiture</Action>
                    <ReusableTable 
                    columns={columns} 
                    data={cars} 
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDeleteCar}
                    />
                </AdminLayout>}
        </>
    );
};

export default Cars;

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

