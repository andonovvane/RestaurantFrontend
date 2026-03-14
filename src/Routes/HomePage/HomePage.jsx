import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { api } from "@/API/api";
import { setMenuItems, selectDesserts, selectMainCourses, selectStarters } from "@/store/slices/menuItems";
import { loadWines, selectWines } from "@/store/slices/wines";
import homebackground from "@/assets/restaurant.png";

// Moved MenuItem component outside to prevent recreation on every render
const MenuItem = ({ label, path }) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex justify-between items-center p-3 cursor-pointer hover:bg-white/10 rounded-xl transition"
            onClick={() => navigate(path)}
        >
            <span className="text-base md:text-lg">{label}</span>
            <button className="text-xl">&gt;</button>
        </div>
    );
};

const HomePage = () => {
    const dispatch = useDispatch();
    const starters = useSelector(selectStarters);
    const mainCourses = useSelector(selectMainCourses);
    const desserts = useSelector(selectDesserts);
    const wines = useSelector(selectWines);

    useEffect(() => {
        // Fetch menu items only if not already loaded
        if (starters.length === 0 && mainCourses.length === 0 && desserts.length === 0) {
            const getMenuItems = async () => {
                try {
                    const res = await api.get("menuitems/");
                    dispatch(setMenuItems(res.data));
                } catch (error) {
                    console.log(error);
                }
            };
            getMenuItems();
        }

        // Fetch wines only if not already loaded
        if (wines.length === 0) {
            const controller = new AbortController();
            
            const fetchWines = async () => {
                try {
                    const res = await api.get("wines/", { signal: controller.signal });
                    dispatch(loadWines(res.data));
                } catch (e) {
                    if (e.name !== "CanceledError") {
                        console.error(e);
                    }
                }
            };
            
            fetchWines();
            
            // Cleanup function
            return () => controller.abort();
        }
    }, [dispatch]); // Only dispatch in dependency array

    const menuItems = [
        { label: "Wine Selection", path: "/wineselection/" },
        { label: "Starters", path: "/starters/" },
        { label: "Main Course", path: "/maincourse/" },
        { label: "Dessert", path: "/desserts" },
        { label: "Menu", path: "/menupage/" },
    ];

    return (
        <div className="relative w-full h-full overflow-hidden bg-restaurant-primary">
            {/* Background */}
            <img
                className="absolute inset-0 w-full h-full object-cover max-h-screen max-w-screen-md m-auto opacity-90"
                src={homebackground}
                alt="Background"
            />

            {/* Overlay gradient for readability */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div> */}

            {/* Menu Section - Glassmorphism + Animation */}
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="absolute bottom-0 left-0 right-0 pb-10 pt-4 
                            bg-stone/10 backdrop-blur-md border-t border-white/20 
                            text-white rounded-t-3xl shadow-xl"
            >
                <div className="pb-6 flex justify-center text-xl md:text-2xl font-semibold">
                    Select a Menu
                </div>

                {/* Menu List */}
                <div className="flex flex-col gap-4 mx-4 md:mx-10">
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} label={item.label} path={item.path} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default HomePage;