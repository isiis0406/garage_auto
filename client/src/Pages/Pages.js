import React from 'react'
import {Routes, Route} from 'react-router-dom';
import HomePage from './HomePage';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Dashboard from '../Pages/Dashboard';
import Services from './admin/services/Services';
import AddServices from './admin/services/AddServices';
import EditServices from './admin/services/EditServices';
import ServiceDetail from './admin/services/ServiceDetail';
import Cars from './admin/cars/Cars';
import AddCars from './admin/cars/AddCars';
import EditCar from './admin/cars/EditCars';
import CarDetail from './admin/cars/CarDetail';
import Users from './admin/users/Users';
import AddUser from './admin/users/AddUser';
import EditUser from './admin/users/EditUsers';
import AddTestimonials from './admin/testimonials/addTestimonial/AddTestimonials';
import Testimonials from './admin/testimonials/Testimonials';
import TestimonialDetail from './admin/testimonials/TestimonialDetail';
import AddOpeningHours from './admin/opening_hours/AddOpeningHours';
import Messages from './admin/message/Messages';
import MessageDetail from './admin/message/messageDetail';
import AdminAddTestimonial from './admin/testimonials/addTestimonial/AdminAddTestimonial';
import Car from '../components/cars/Car';
function Pages() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            
            {/* Auth */}
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/resetpassword/:resetToken' element={<ResetPassword/>}/>
            
             <Route path='/admin' element={<Services/>}/>
            

            { /* Admin Services */}
            <Route path='/admin/services' element={<Services/>}/>
            <Route path='/admin/add-service' element={<AddServices/>}/>
            <Route path='/admin/edit-service/:id' element={<EditServices/>}/>
            <Route path='/admin/service-detail/:id' element={<ServiceDetail/>}/>
            
            { /* Car Detail */}
            <Route path='/home/car-detail/:id' element={<Car/>}/>

            { /* Admin Dashboard */}
            
            {/* Admin Cars */}
            <Route path='/admin/cars' element={<Cars/>}/>
            <Route path='/admin/add-car' element={<AddCars/>}/>
            <Route path='/admin/edit-car/:id' element={<EditCar/>}/>
            <Route path='/admin/car-detail/:id' element={<CarDetail/>}/>

            { /* Admin Testimonials */}
            <Route path='/admin/testimonials' element={<Testimonials/>}/>
            <Route path='/add-testimonial' element={<AddTestimonials/>}/>
            <Route path='/admin/add-testimonial' element={<AdminAddTestimonial/>}/>
            <Route path='/admin/testimonial-detail/:id' element={<TestimonialDetail/>}/>

          
            {/* Admin Users */}
            <Route path='/admin/users' element={<Users/>}/>
            <Route path='/admin/add-user' element={<AddUser/>}/>
            <Route path='/admin/edit-user/:id' element={<EditUser/>}/>

            { /* Admin Opening Hours */}
            <Route path='/admin/add-opening-hours' element={<AddOpeningHours/>}/>

            { /* Admin Messages */}
            <Route path='/admin/messages' element={<Messages/>}/>
            <Route path='/admin/message-detail/:id' element={<MessageDetail/>}/>

            {/* test */}
            {/* <Route path='/test' element={<UserList/>}/>         */}
        
        
        </Routes>
    </div>
  )
}

export default Pages