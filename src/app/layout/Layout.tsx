import { Header } from "@/components/ui/header";
import { Outlet } from "react-router";

const Layout = () => {
    return <div>
        <Header />
        <div className="max-w-[var(--container_mw)] pt-8 m-auto">
            <Outlet />
        </div>
    </div>
}

export default Layout;