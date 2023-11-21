import { useSelector } from "react-redux";
import { selectIsLoggedInd } from "../../redux/features/auth/authSlice";
import { getUserData } from "../../services/authService";
import { useEffect, useState } from "react";

// User logged In
export const ShowOnLogin = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedInd);
    if (isLoggedIn) {
        return <> {children}</>;
    } else {
        return null;
    }
}
// User logged Out
export const ShowOnLogout = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedInd);
    if (!isLoggedIn) {
        return <> {children}</>;
    } else {
        return null;
    }
}

// User logged In and is admin
export const ShowOnAdmin = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedInd);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            if (isLoggedIn) {
                const user = await getUserData();
                if (user.role === "admin") {
                    setIsAdmin(true);
                }
            }
        }
        fetchUserData();
    }, [isLoggedIn]);

    return isAdmin ? <> {children} </> : null;
}