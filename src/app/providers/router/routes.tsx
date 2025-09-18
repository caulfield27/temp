import { createBrowserRouter } from "react-router";
import Layout from "../../layout/Layout";
import Login from "../../../pages/Login";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [],
    },
    {
        path: "/login",
        element: <Login/>
    }
])