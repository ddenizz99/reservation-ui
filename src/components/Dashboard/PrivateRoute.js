//import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    //const { user } = useAuth();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    if (!isAuthenticated) {
        return <Navigate to={"/auth/login"} />
    }
    return children;
}