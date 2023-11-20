import React, { useEffect, useState } from 'react'
import OpeningHoursForm from '../../../components/admin/openingHoursForm/OpeningHoursForm '
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedInd } from '../../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { createOpeningHours, getOpeningHours } from '../../../redux/features/openingHours/openingHoursSlice';
import AdminLayout from '../../../components/admin/adminLayout/AdminLayout';
const initialHours = [
    { day: "Lundi", morning_hours: "08:45 - 12:00", afternoon_hours: "14:00 - 18:00" },
    { day: "Mardi", morning_hours: "08:45 - 12:00", afternoon_hours: "14:00 - 18:00" },
    { day: "Mercredi", morning_hours: "08:45 - 12:00", afternoon_hours: "14:00 - 18:00" },
    { day: "Jeudi", morning_hours: "08:45 - 12:00", afternoon_hours: "14:00 - 18:00" },
    { day: "Vendredi", morning_hours: "08:45 - 12:00", afternoon_hours: "14:00 - 18:00" },
    { day: "Samedi", morning_hours: "08:45 - 12:00", afternoon_hours: "Fermé" },
    { day: "Dimanche", morning_hours: "Fermé", afternoon_hours: "Fermé" }
];

function AddOpeningHours() {
    useRedirectLoggedOutUser('/login');


    const isLoggedIn = useSelector(selectIsLoggedInd);
    const [hours, setHours] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { openingHours, isLoading } = useSelector((state) => state.openingHours);

    useEffect(() => {
        if (openingHours && openingHours.length > 0) {
            setHours(openingHours);
            console.log(openingHours);
        } else {
            setHours(initialHours);
        }
    }, [openingHours]);


    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getOpeningHours());
        }
    }, [isLoggedIn, dispatch]);

    const handleInputChange = (index, period, value) => {
        const updatedHours = [...hours];
        updatedHours[index] = {
            ...updatedHours[index],
            [period]: value
        };
        setHours(updatedHours);
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            const result = await dispatch(createOpeningHours(hours));
            if (!result.error) {

                navigate('/');
            }
        }

    };
    return (
        <div>
            <AdminLayout title='Gestion des horaires'>
                <OpeningHoursForm
                    hours={hours}
                    setHours={setHours}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                />
            </AdminLayout>

        </div>
    )
}

export default AddOpeningHours