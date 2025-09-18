import { RouterProvider } from "react-router";
import { routes } from "./routes";

export const AppProvider  = () => {
    return <RouterProvider router={routes}/>;
};