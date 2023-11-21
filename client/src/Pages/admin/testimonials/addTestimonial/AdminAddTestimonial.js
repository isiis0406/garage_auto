import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../components/admin/adminLayout/AdminLayout.js'
import useRedirectLoggedUser from '../../../../customHook/useRedirectLoggedOutUser.js'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectIsLoggedInd } from '../../../../redux/features/auth/authSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../../../components/loader/loader.js'
import CarForm from '../../../../components/admin/car/carForm.js'
import { createTestimonial } from '../../../../redux/features/testimonials/testimonialSlice.js'
import TestimonialForm from '../../../../components/admin/testimonial/TestimonialForm.js'
import styled from 'styled-components'
import { FullHeightContainer } from '../../../../components/auth/partials/StyledComponents.js'
import { toast } from 'react-toastify'
const initialState = {
    name: '',
    email: '',
    content: '',
    rating: ''
}
function AdminAddTestimonial() {

    const isLoggedIn = useSelector(selectIsLoggedInd);
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.testimonials);

    const [testimonial, setTestimonial] = useState(initialState);



    const navigate = useNavigate();

    const { name, email, content, rating } = testimonial
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTestimonial({ ...testimonial, [name]: value });
    };


    const handleSaveTestimonial = async (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            const formData = {
                name,
                email,
                content,
                rating,
            }
            const result = await dispatch(createTestimonial(formData));
            if (!result.error) {
                toast.success('Témoignage enregistré avec succès');
                navigate('/admin/testimonials');
            }

        }

    }


    return (
        <>
            {isLoading && <Loader />}
            <AdminLayout>
                <TestimonialForm
                    testimonial={testimonial}
                    setTestimonial={setTestimonial}
                    handleInputChange={handleInputChange}
                    handleSaveTestimonial={handleSaveTestimonial}
                    labelButton="Soumettre"
                />
            </AdminLayout>

        </>
    )
}

export default AdminAddTestimonial
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
