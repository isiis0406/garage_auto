import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin/adminLayout/AdminLayout.js'
import useRedirectLoggedUser from '../../../customHook/useRedirectLoggedOutUser.js'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectIsLoggedInd } from '../../../redux/features/auth/authSlice.js'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/loader/loader.js'
import CarForm from '../../../components/admin/car/carForm.js'
import { createCar } from '../../../redux/features/cars/carSlice.js'
import { createUser } from '../../../redux/features/users/userSlice.js'
import UserForm from '../../../components/admin/user/UserForm.js'
const initialState = {
    name: '',
    email: '',
    role: ''
}
function AddUsers() {
    useRedirectLoggedUser('/login');

    const isLoggedIn = useSelector(selectIsLoggedInd);
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.users);

    const [user, setUser] = useState(initialState);

    const navigate = useNavigate();

    const { name, email, role } = user;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            const formData = {
                name,
                email,
                role
            }
            const result = await dispatch(createUser(formData));
            if (!result.error) {
                navigate('/admin/users');
            }
        }
    }


    return (
        <>
            {isLoading && <Loader />}
            <AdminLayout title="Ajouter un utilisateur">
                <UserForm
                    user={user}
                    setUser={setUser}
                    handleInputChange={handleInputChange}
                    handleSaveUser={handleSaveUser}
                    labelButton="Créer"
                />
            </AdminLayout>
        </>
    )
}

export default AddUsers
