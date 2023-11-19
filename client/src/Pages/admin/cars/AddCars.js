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
const initialState = {
    brand: '',
    model: '',
    release_year: '',
    price: '',
    kilometers: '',
    description: '',
    image: null
}
function AddCars() {
    useRedirectLoggedUser('/login');

    const isLoggedIn = useSelector(selectIsLoggedInd);
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.cars);

    const [car, setCar] = useState(initialState);
    const [imagePreview, setImagePreview] = useState(null);



    const navigate = useNavigate();

    const { brand,model, release_year, price, kilometers,  description, image } = car;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setCar({ ...car, image: file });
        setImagePreview(URL.createObjectURL(file));
    };



    const handleSaveCar = async (e) => {
        console.log('handleSaveCar');
        e.preventDefault();
        if (isLoggedIn) {
            const formData = new FormData();
            formData.append("brand", brand);
            formData.append("model", model);
            formData.append("release_year", release_year);
            formData.append("price", price);
            formData.append("kilometers", kilometers);
            formData.append("description", description);
            formData.append("image", image);
            const result = await dispatch(createCar(formData));
            if (!result.error) {
                navigate('/admin/cars');
            }

        }





    }


    return (
        <>
            {isLoading && <Loader />}
            <AdminLayout title="Ajouter une voiture">
                <CarForm
                    car={car}
                    setCar={setCar}
                    imagePreview={imagePreview}
                    handleImageChange={handleImageChange}
                    handleInputChange={handleInputChange}
                    handleSaveCar={handleSaveCar}
                    labelButton="Créer"
                />
            </AdminLayout>
        </>
    )
}

export default AddCars
