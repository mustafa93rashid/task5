import { createHashRouter } from "react-router-dom";
import Auth from "../pages/authPages/Auth/Auth";
import Login from "../pages/authPages/Login/Login";
import Signup from "../pages/authPages/Signup/Signup";
import Home from "../pages/DashboardPages/Home";
import AddItem from "../pages/DashboardPages/AddItem/AddItem";
import EditItem from "../pages/DashboardPages/EditItem/EditItem";
import ItemInfo from "../pages/DashboardPages/ItemInfo/ItemInfo";
import ItemsIndex from "../pages/DashboardPages/ItemsIndex/ItemsIndex";
import Dashboard from "../pages/DashboardPages/Dashboard";
import Error from "../pages/errorPage/Error";

export const routers = createHashRouter([
    {
        path: '/',
        element: <Auth />,
        children: [
            {
                path: '',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'itemindex',
                element: <Dashboard />,
                children: [
                    {
                        path: '',
                        element: <ItemsIndex />
                    },
                    {
                        path: 'additem',
                        element: <AddItem />
                    },
                    {
                        path: 'edititem/:id',
                        element: <EditItem />
                    },
                    {
                        path: 'iteminfo/:id',
                        element: <ItemInfo />
                    }
                ]

            }
        ]
    },
    {
        path: '*',
        element: <Error />,
    }
]);