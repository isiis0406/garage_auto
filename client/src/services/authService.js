/* eslint-disable no-control-regex */
import axios from "axios";
import {toast} from "react-toastify";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {
   return email.match( /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i)
}

//Register User
export const registerUser = async (userData) => {
 try {
    const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData)
   if(response.status === 201 || response.status === 200){
      toast.success('Compte créer avec succès');
      return response.data
   }
   } catch (error) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message) 
      || error.message 
      || error.toString();

      //Notification :
      toast.error(message);
      
 }   
}

//Login User
export const loginUser = async (userData) => {
 try {
    const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData)
   if(response.status === 201 || response.status === 200){
      toast.success(`Bienvenu ${response.data.name}`);
      return response.data
   }
   } catch (error) {
      console.log(error);
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message) 
      || error.message 
      || error.toString();

      //Notification :
      toast.error(message);
      
 }   
}
//Logout User
export const logoutUser = async () => {
 try {
    await axios.get(`${BACKEND_URL}/api/users/logout`)
   
   } catch (error) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message) 
      || error.message 
      || error.toString();

      //Notification :
      toast.error(message);
      
 }   
}

//Forgot Password 
export const forgotPassword = async (userData) => {
   try {
      const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, userData)
     if(response.status === 201 || response.status === 200){
        toast.success(response.data.message);
     }
     } catch (error) {
      const message = (
        error.response && 
        error.response.data && 
        error.response.data.message) 
        || error.message 
        || error.toString();
  
        //Notification :
        toast.error(message);
        
   }   
  }
//Reset Password 
export const resetPassword = async (userData, resetToken) => {
   try {
      const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData)
     if(response.status === 201 || response.status === 200){
        toast.success(response.data.message);
         return response.data;
      }
     } catch (error) {
      const message = (
        error.response && 
        error.response.data && 
        error.response.data.message) 
        || error.message 
        || error.toString();
  
        //Notification :
        toast.error(message);
        
   }   
  }
//Get login status 
export const getLoginStatus = async (userData, resetToken) => {
   try {
      const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`)
     if(response.status === 200){
        return response.data;
      }
     } catch (error) {
      const message = (
        error.response && 
        error.response.data && 
        error.response.data.message) 
        || error.message 
        || error.toString();
  
        //Notification :
        toast.error(message);
        
   }   
  }
//Get login status 
export const getUserData = async () => {
   try {
      const response = await axios.get(`${BACKEND_URL}/api/users/getauthuser`)
     if(response.status === 200){
        return response.data;
      }
     } catch (error) {
      const message = (
        error.response && 
        error.response.data && 
        error.response.data.message) 
        || error.message 
        || error.toString();
  
        //Notification :
        toast.error(message);
        
   }   
  }


