import { createBrowserRouter } from "react-router";
import Layout from "../../layout/Layout";
import Login from "@/pages/login";
import HomePage from "@/pages/home";
import Applications from "@/pages/applications";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "applications",
                element: <Applications/>
            }
        ],
    },
    {
        path: "/login",
        element: <Login/>
    }
])