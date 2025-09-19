import { createBrowserRouter } from "react-router";
import Layout from "../../layout/Layout";
import Login from "@/pages/login";
import HomePage from "@/pages/home";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            }
        ],
    },
    {
        path: "/login",
        element: <Login/>
    }
])