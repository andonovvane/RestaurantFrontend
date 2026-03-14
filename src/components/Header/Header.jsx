import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderPopUp from "@/components/OrderPopUp/OrderPopUp";
import HamburgerMenuIcon from "@/assets/hamburgermenu.png";
import CartIcon from "@/assets/cart.png";
import { selectDetails, logout } from "@/store/slices/userSlice";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "../ui/sheet";

const Header = () => {
    const navigate = useNavigate();
    const [showOrderPopup, setShowOrderPopup] = useState(false);
    const items = useSelector(state => state.order.items);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const userDetails = useSelector(selectDetails)
    const handleBackClick = () => navigate(-1);
    const handleLogoClick = () => navigate("/");
    const [showDrawer, setShowDrawer] = useState(false);
    // console.log("User details in header:", userDetails);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/signin/");
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 bg-neutral-950 text-white flex justify-between items-center px-8 py-4">
                <div className="cursor-pointer" onClick={handleBackClick}>&lt;</div>

                <div className="cursor-pointer font-display text-xl" onClick={handleLogoClick}>
                    Andonov's
                </div>

                <div className="flex items-center gap-4">
                    {/* Cart Icon */}
                    {userDetails?.role === 'client' && (
                        <div
                            className="relative cursor-pointer"
                            onClick={() => setShowOrderPopup(true)}
                        >
                            <img
                                src={CartIcon}
                                alt="order icon"
                                className="size-5"
                            />

                            {/* Item count badge */}
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </div>

                    )}

                    {/* Hamburger menu */}
                    <div className="inline-block size-6 cursor-pointer" onClick={() => setShowDrawer(true)}>
                        <img
                            src={HamburgerMenuIcon}
                            alt="hamburger menu icon"
                            />
                    </div>
                    <Sheet open={showDrawer} onOpenChange={setShowDrawer}>
                        <SheetContent side="right" className="bg-stone-900 text-white border-0">
                            <SheetDescription></SheetDescription> {/* Optional description - removes the warning in console*/}
                            <SheetHeader>
                                <SheetTitle className="text-white">Menu</SheetTitle>
                            </SheetHeader>
                            <div className="space-y-4 mt-6 mb-6">
                                <p>User: {userDetails?.username}</p>
                            </div>
                            <div>
                                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                                    Logout
                                </button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Order Popup Component */}
            {showOrderPopup && (
                <OrderPopUp onClose={() => setShowOrderPopup(false)} />
            )}
        </>
    );
};

export default Header;