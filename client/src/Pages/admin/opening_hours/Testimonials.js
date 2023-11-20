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
import { approveTestimonial, deleteTestimonial, getTestimonials } from '../../../redux/features/testimonials/testimonialSlice.js';
const Testimonials = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedInd);
    // Récupérer les états globaux depuis le redux
    const { testimonials, isLoading, isError, message } = useSelector((state) => state.testimonials);
    
    const handleApprouve = async (id) => {
        console.log(id);
        const result = await dispatch(approveTestimonial(id));
        if(!result.error){
            await dispatch(getTestimonials());
            navigate('/admin/testimonials');
        }
    };
    const handleView = async (id) => {
        await navigate(`/admin/testimonial-detail/${id}`)
    };
    const handleDeleteTestimonial = async (id) => {   
        
       const result = await dispatch(deleteTestimonial(id));
        if(!result.error){
            await dispatch(getTestimonials());
            navigate('/admin/testimonials');
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTestimonials());
            if (isError) {
                console.log(message);
            }
        }
    }, [isError, message, dispatch, isLoggedIn]);


    const columns = [
        { header: 'Nom', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Contenu', accessor: 'content' },
        { header: 'Note', accessor: 'rating' },
        { header: 'Statut', accessor: 'status' },

    ];

    return (
        <>
            {isLoading && <Loader />}
            {testimonials &&
                <AdminLayout title="Gestion des avis">
                    <ReusableTable 
                    columns={columns} 
                    data={testimonials}
                    handleView={handleView}
                    handleApprouve={handleApprouve}
                    handleDelete={handleDeleteTestimonial}
                    />
                </AdminLayout>}
        </>
    );
};

export default Testimonials;

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

