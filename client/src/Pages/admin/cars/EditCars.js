import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getService, getServices, selectSelectedService, updateService } from '../../../redux/features/services/serviceSlice';
import ServiceForm from '../../../components/admin/service/serviceForm';
import AdminLayout from '../../../components/admin/adminLayout/AdminLayout';
import Loader from '../../../components/loader/loader';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { getCar, getCars, updateCar } from '../../../redux/features/cars/carSlice';
import CarForm from '../../../components/admin/car/carForm';

function EditCar() {
    useRedirectLoggedOutUser('/login');

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setCar({ ...car, image: file });
        setImagePreview(URL.createObjectURL(file));
    };
    
    const { selectedCar, isLoading } = useSelector(state => state.cars);
    
    useEffect(() => {
        dispatch(getCar(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedCar) {
            setCar(selectedCar);
            setImagePreview(selectedCar.image_path || null);
        }
    }, [selectedCar]);


    const handleSaveCar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('brand', car.brand);
        formData.append('model', car.model);
        formData.append('release_year', car.release_year);
        formData.append('price', car.price);
        formData.append('kilometers', car.kilometers);
        formData.append('description', car.description);
        if (car.image) {
            formData.append('image', car.image);
        }
        const result = await dispatch(updateCar({ id, formData }));
        if(!result.error){
            await dispatch(getCars());
            navigate('/admin/cars');
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <AdminLayout title="Modifier une voiture">
            <CarForm
                car={car}
                setCar={setCar}
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                handleInputChange={handleInputChange}
                handleSaveCar={handleSaveCar}
                labelButton="Modifier"
            />
        </AdminLayout>
    );
}

export default EditCar;
