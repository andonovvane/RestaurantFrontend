// Starters.jsx
import { useSelector } from "react-redux";
import { selectStarters } from "../../store/slices/menuItems";
import MenuCategory from "../MenuCategory/MenuCategory";

const Starters = () => {
    const starters = useSelector(selectStarters);
    return <MenuCategory items={starters} />;
};

export default Starters;
