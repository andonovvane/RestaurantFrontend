import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout/Layout";
import HomePage from "./HomePage/HomePage";
import WineSelection from "@/components/WineSelection/WineSelection";
import Starters from "@/components/Starters/Starters";
import MainCourses from "@/components/MainCourses/MainCourses";
import Desserts from "@/components/Desserts/Desserts";
import MenuPage from "./MenuPage/MenuPage";
import SignIn from "@/components/Authentication/SignIn";
import QRLoginPage from "@/components/Authentication/QRLogin";
import OrdersDashboard from "@/Routes/OrdersDashboard/OrdersDashboard";
import KitchenView from "@/Routes/KitchenView/KitchenView";
import CEODashboard from "@/Routes/CEODashboard/CEODashboard";
import ProtectedRoute from "../../src/components/ProtectedRoutes/ProtectedRoutes";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes - no auth needed */}
                <Route path="/signin/" element={<SignIn />} />
                <Route path="/qr-login/" element={<QRLoginPage />} />

                {/* Customer routes - any authenticated user */}
                <Route element={<ProtectedRoute allowedRoles={['client', 'waiter', 'kitcher', 'ceo']} />}>
                    <Route path="/" element={<HomePage />} />
                    <Route element={<Layout />}>
                        <Route path="/wineselection/" element={<WineSelection />} />
                        <Route path="/starters/" element={<Starters />} />
                        <Route path="/maincourse/" element={<MainCourses />} />
                        <Route path="/desserts/" element={<Desserts />} />
                        <Route path="/menupage/" element={<MenuPage />} />
                    </Route>
                </Route>

                {/* Staff routes - waiters and CEO */}
                <Route element={<ProtectedRoute allowedRoles={['waiter', 'ceo']} />}>
                    <Route path="/orders/" element={<OrdersDashboard />} />
                </Route>

                {/* Kitchen routes - kitcher and CEO */}
                <Route element={<ProtectedRoute allowedRoles={['kitcher', 'ceo']} />}>
                    <Route path="/kitchen/" element={<KitchenView />} />
                </Route>

                {/* CEO only routes */}
                <Route element={<ProtectedRoute allowedRoles={['ceo']} />}>
                    <Route path="/dashboard/" element={<CEODashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;