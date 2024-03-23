import DashboardLayout from "./layout/Dashboard/index";
import AuthLayout from "./layout/Auth/index";
import PrivateRoute from "./components/Dashboard/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blank from "./pages/Dashboard/Blank";
import Login from "./pages/Auth/Login";
import Page404 from "./pages/Dashboard/Page404";

const routes = [
    {
        path: '/',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'blank-page',
                element: <Blank />
            },
            {
                path: '*',
                element: <Page404 />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            }
        ]
    },
    {
        path: '*',
        element: <Page404 />
    }
]

export default routes;