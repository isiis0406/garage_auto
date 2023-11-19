import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getService, getServices, selectSelectedService, updateService } from '../../../redux/features/services/serviceSlice';
import ServiceForm from '../../../components/admin/service/serviceForm';
import AdminLayout from '../../../components/admin/adminLayout/AdminLayout';
import Loader from '../../../components/loader/loader';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { getCar, getCars, updateCar } from '../../../redux/features/cars/carSlice';
import { getUser, getUsers, updateUser } from '../../../redux/features/users/userSlice';
import UserForm from '../../../components/admin/user/UserForm';

function EditCar() {
    useRedirectLoggedOutUser('/login');

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
  
    
    const { selectedUser, isLoading } = useSelector(state => state.users);
    
    useEffect(() => {
        dispatch(getUser(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedUser) {
            setUser(selectedUser);
        }
    }, [selectedUser]);


    const handleSaveUser = async (e) => {
        e.preventDefault();
        const formData = {
            name : user.name || selectedUser.name,
            email : user.email || selectedUser.email,
            role : user.role || selectedUser.role
        }
        const result = await dispatch(updateUser({ id, formData }));
        if(!result.error){
            await dispatch(getUsers());
            navigate('/admin/users');
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <AdminLayout title="Modifier une voiture">
            <UserForm
                user={user}
                setUser={setUser}
                handleInputChange={handleInputChange}
                handleSaveUser={handleSaveUser}
                labelButton="Modifier"
            />
        </AdminLayout>
    );
}

export default EditCar;
