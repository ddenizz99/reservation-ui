import DashboardLayout from "./layout/Dashboard/index";
import AuthLayout from "./layout/Auth/index";
import PrivateRoute from "./components/Dashboard/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blank from "./pages/Dashboard/Blank";
import Login from "./pages/Auth/Login";
import Page404 from "./pages/Dashboard/Page404";
import InfoLayout from "./layout/Info";
import ReservationInfo from "./pages/Info/ReservationInfo";
import CustomersPage from "./pages/Dashboard/CustomersPage";
import CustomerDetail from "./pages/Dashboard/CustomerDetail";
import CustomerEdit from "./pages/Dashboard/CustomerEdit";
import ReportingPage from "./pages/Dashboard/ReportingPage";

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
                path: 'customers',
                element: <CustomersPage/>
            },
            {
                path: 'blank-page',
                element: <Blank />
            },
            {
                path: '/customer/detail/:id',
                element: <CustomerDetail />
            },
            {
                path: '/customer/edit/:id',
                element: <CustomerEdit />
            },
            {
                path: '/reporting',
                element: <ReportingPage />
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
        path: '/info',
        element: <InfoLayout />,
        children: [
            {
                path: 'reservation/:code',
                element: <ReservationInfo />
            }
        ]
    },
    {
        path: '*',
        element: <Page404 />
    }
]

export default routes;