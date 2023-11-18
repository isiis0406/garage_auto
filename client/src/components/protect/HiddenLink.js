import { useSelector } from "react-redux";
import { selectIsLoggedInd } from "../../redux/features/auth/authSlice";

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