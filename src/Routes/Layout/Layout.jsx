import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

const Layout = () => {

    return (
        <>
            <Header />
            <main className="pt-10 px-1">
                <Outlet />
            </main>
        </>
    )

}

export default Layout;