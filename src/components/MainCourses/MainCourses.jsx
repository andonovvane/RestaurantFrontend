// MainCourses.jsx
import { useSelector } from "react-redux";
import { selectMainCourses } from "../../store/slices/menuItems";
import MenuCategory from "../MenuCategory/MenuCategory";

const MainCourses = () => {
    const mainCourses = useSelector(selectMainCourses);
    return <MenuCategory items={mainCourses} />;
};

export default MainCourses;
