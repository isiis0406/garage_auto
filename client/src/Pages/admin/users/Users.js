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
import { deleteUser, getUsers } from '../../../redux/features/users/userSlice.js';
const Users = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedInd);
    // Récupérer les états globaux depuis le redux
    const { users, isLoading, isError, message } = useSelector((state) => state.users);
    
    const handleView = async (id) => {
        await navigate(`/admin/user-detail/${id}`)
    };
    const handleEdit = async (id) => {
        await navigate(`/admin/edit-user/${id}`)
    };
    const handleDeleteUser = async (id) => {   
        
       const result = await dispatch(deleteUser(id));
        if(!result.error){
            await dispatch(getUsers());
            navigate('/admin/users');
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getUsers());
            if (isError) {
                console.log(message);
            }
        }
    }, [isError, message, dispatch, isLoggedIn]);


    const columns = [
        { header: 'Nom', accessor: 'name' },
        { header: 'email', accessor: 'email' },
        { header: 'rôle', accessor: 'role' },


    ];

    return (
        <>
            {isLoading && <Loader />}
            {users &&
                <AdminLayout title="Gestion des utilisateurs">
                    <Action to="/admin/add-user">Ajouter un utilisateur</Action>
                    <ReusableTable 
                    columns={columns} 
                    data={users} 
                    handleEdit={handleEdit}
                    handleDelete={handleDeleteUser}
                    />
                </AdminLayout>}
        </>
    );
};

export default Users;

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

