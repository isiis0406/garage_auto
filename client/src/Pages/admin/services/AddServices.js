import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin/adminLayout/AdminLayout'
import ServiceForm from '../../../components/admin/service/serviceForm'
import useRedirectLoggedUser from '../../../customHook/useRedirectLoggedOutUser.js'
import { useDispatch } from 'react-redux'
import { SET_IS_SUCCESS, addService, createService, selectIsLoading } from '../../../redux/features/services/serviceSlice.js'
import { useSelector } from 'react-redux'
import { selectIsLoggedInd } from '../../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/loader/loader.js'
const initialState = {
    title: '',
    description: '',
    image: null
}
function AddServices() {

    const isLoggedIn = useSelector(selectIsLoggedInd);
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.services);
    useRedirectLoggedUser('/login');

    const [service, setService] = useState(initialState);
    const [serviceImage, setServiceImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);


    const navigate = useNavigate();

    const { title, description, image } = service;
    


    const handleSaveService = async (e) => {
        if (isLoggedIn) {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);
           const result = await dispatch(createService(formData));
           if(!result.error){
            navigate('/admin/services');
           }
           
        }





    }


    return (
        <>
            {isLoading && <Loader />}
            <AdminLayout title="Ajouter un services">
                <ServiceForm
                    service={service}
                    setService={setService}
                    handleSaveService={handleSaveService}

                    labelButton="Créer"
                />
            </AdminLayout>
        </>
    )
}

export default AddServices