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
// import AddUser from './user/AddUser';
// import Users from './user/User';
// import EditUser from './user/EditUser';
// import UserList from '../components/table/example/UserList';
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
            
             <Route path='/admin' element={<Dashboard/>}/>
            

            { /* Admin Services */}
            <Route path='/admin/services' element={<Services/>}/>
            <Route path='/admin/add-service' element={<AddServices/>}/>
            <Route path='/admin/edit-service/:id' element={<EditServices/>}/>
            {/* Admin Cars */}
          
            {/* Users */}
            {/* <Route path='/admin/users' element={<Users/>}/>
            <Route path='/admin/add-user' element={<AddUser/>}/>
            <Route path='/admin/edit-user/:id' element={<EditUser/>}/> */}

            {/* test */}
            {/* <Route path='/test' element={<UserList/>}/>         */}
        
        
        </Routes>
    </div>
  )
}

export default Pages