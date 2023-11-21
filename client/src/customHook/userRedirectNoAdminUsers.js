import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus, getUserData } from "../services/authService";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";


const useRedirectNoAdminUser = (path) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    useEffect(() => {
        const redirectNoAdminUser = async () => {
            const isLoggedIn = await getLoginStatus();
            if (isLoggedIn) {
                const user = await getUserData();
                console.log(user);
                if (user && user.role !== "admin") {
                    toast.info("Non authorisé")
                    navigate(path);
                    return ;
                }
            }
        };
        redirectNoAdminUser();
    }, [dispatch, navigate, path]);
}

export default useRedirectNoAdminUser;