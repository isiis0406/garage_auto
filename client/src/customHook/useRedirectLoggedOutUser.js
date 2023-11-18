import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus } from "../services/authService";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";


const useRedirectLoggedOutUser = (path) =>{
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus();
            dispatch(SET_LOGIN(isLoggedIn));
            if(!isLoggedIn){
                toast.info("Session expirée, veillez vous authentifier")
                navigate(path);
                return;
            }
        };
        redirectLoggedOutUser();
    }, [dispatch, navigate,path]);
}

export default useRedirectLoggedOutUser;