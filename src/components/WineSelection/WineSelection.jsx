import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addItemToCurrentOrder } from "../../store/slices/orderSlice";


const WineSelection = () => {
    const wines = useSelector((state) => state.wine.wines);
    const [clickedWines, setClickedWines] = useState({});
    const dispatch = useDispatch();

    const handleBtnClick = (wine) => {
        setClickedWines(prev => ({
            ...prev,
            [wine.id]: !prev[wine.id]
        }));
        dispatch(addItemToCurrentOrder({ ...wine, type: "wine" }));
    };

    const wineTypes = [
        { type: "sparkling", title: "Sparkling Wines" },
        { type: "red", title: "Red Wines" },
        { type: "white", title: "White Wines" },
        { type: "rose", title: "Rose Wines" },
    ];

    return (
        <div className="w-full flex flex-col gap-10 mt-5 px-4">
            {wineTypes.map(({ type, title }) => {
                const winesByType = wines.filter(w => w.wine_type === type);
                if (winesByType.length === 0) return null;

                return (
                    <div key={type} className="flex flex-col gap-4">
                        <h1 className="text-3xl text-center mb-4">&#x2661; {title} &#x2661;</h1>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {winesByType.map(wine => {
                                const isClicked = clickedWines[wine.id];
                                const btnTxt = isClicked ? "Added to Order List" : "Add to Order List";

                                return (
                                    <div 
                                        key={wine.id} 
                                        className="flex flex-col w-full h-[450px] bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
                                    >
                                        <img
                                            src={wine.image_item}
                                            alt={wine.name}
                                            className="w-full h-80 object-contain"
                                        />
                                        <div className="flex-1 flex flex-col justify-between p-4">
                                            <h1 className="text-xl font-semibold truncate">{wine.name}</h1>
                                            <p className="text-gray-400 text-sm mt-1 truncate">{wine.description}</p>
                                            <div className="flex justify-between items-center mt-4">
                                                <span className="text-lg font-bold">{wine.price} CHF</span>
                                                <button 
                                                    onClick={() => handleBtnClick(wine)}
                                                    className={`px-3 py-1 rounded-lg border transition ${isClicked ? 'bg-red-500 border-red-600' : 'hover:bg-white/10'}`}
                                                >
                                                    {btnTxt}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WineSelection;
