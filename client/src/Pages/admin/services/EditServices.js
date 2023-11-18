import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getService, getServices, selectSelectedService, updateService } from '../../../redux/features/services/serviceSlice';
import ServiceForm from '../../../components/admin/service/serviceForm';
import AdminLayout from '../../../components/admin/adminLayout/AdminLayout';
import Loader from '../../../components/loader/loader';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';

function EditServices() {
    useRedirectLoggedOutUser('/login');

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setService({ ...service, [name]: value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setService({ ...service, image: file });
        setImagePreview(URL.createObjectURL(file));
    };
    
    const { selectedService, isLoading } = useSelector(state => state.services);
    
    useEffect(() => {
        dispatch(getService(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedService) {
            setService(selectedService);
            setImagePreview(selectedService.image_path || null);
        }
    }, [selectedService]);


    const handleSaveService = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', service.title);
        formData.append('description', service.description);
        if (service.image) {
            formData.append('image', service.image);
        }
        const result = await dispatch(updateService({ id, formData }));
        await dispatch(getServices());
        if(!result.error){
            navigate('/admin/services');
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <AdminLayout title="Modifier un service">
            <ServiceForm
                service={service}
                setService={setService}
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                handleInputChange={handleInputChange}
                handleSaveService={handleSaveService}
                labelButton="Modifier"
            />
        </AdminLayout>
    );
}

export default EditServices;
