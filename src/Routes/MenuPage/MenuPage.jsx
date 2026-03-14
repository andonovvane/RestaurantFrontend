import Desserts from "../../components/Desserts/Desserts"
import MainCourses from "../../components/MainCourses/MainCourses"
import Starters from "../../components/Starters/Starters"


const MenuPage = () => {

    return (
        <div>
            <section id="starters">
                <div className="flex flex-1 justify-center w-full border py-10 my-10">
                    <h1>Starters</h1>
                </div>
                <Starters />
            </section>
            <section id="main-courses">
                <div className="flex flex-1 justify-center w-full border py-10 my-10">
                    <h1>Main Courses</h1>
                </div>
                <MainCourses />
            </section>
            <section id="desserts">
                <div className="flex flex-1 justify-center w-full border py-10 my-10">
                    <h1>Desserts</h1>
                </div>
                <Desserts />
            </section>
        </div>
    )
}

export default MenuPage


