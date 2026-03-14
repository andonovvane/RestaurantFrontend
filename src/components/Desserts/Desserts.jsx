// Desserts.jsx
import { useSelector } from "react-redux";
import { selectDesserts } from "../../store/slices/menuItems";
import MenuCategory from "../MenuCategory/MenuCategory";

const Desserts = () => {
    const desserts = useSelector(selectDesserts);
    return <MenuCategory items={desserts} />;
};

export default Desserts;
