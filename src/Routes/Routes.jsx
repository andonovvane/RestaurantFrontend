import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout/Layout";
import HomePage from "./HomePage/HomePage";
import WineSelection from "../components/WineSelection/WineSelection";
import Starters from "../components/Starters/Starters";
import MainCourses from "../components/MainCourses/MainCourses";
import Desserts from "../components/Desserts/Desserts";
import MenuPage from "./MenuPage/MenuPage";
import SignIn from "../components/Authentication/SignIn";
import QRLoginPage from "../components/Authentication/QRLogin";
import OrdersDashboard from "../Routes/OrdersDashboard/OrdersDashboard";
import KitchenView from "../Routes/KitchenView/KitchenView";
import CeoDashboard from "./CEODashboard/CEODashboard";

const Router = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route element={<Layout />}>
                        <Route path="/wineselection/" element={<WineSelection />} />
                        <Route path="/starters/" element={<Starters />} />
                        <Route path="/maincourse/" element={<MainCourses />} />
                        <Route path="/desserts/" element={<Desserts />} />
                        <Route path="/menupage/" element={<MenuPage />} />
                        <Route path="/signin/" element={<SignIn />} />
                        <Route path="/qr-login/" element={<QRLoginPage />} />
                        <Route path="/orders/" element={<OrdersDashboard />} />
                        <Route path="/kitchen-view/" element={<KitchenView />} />
                        <Route path="/ceo-dashboard/" element={<CeoDashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}

export default Router;