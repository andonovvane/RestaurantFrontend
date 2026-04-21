import { useSelector } from "react-redux";
import ItemCard from "@/components/ItemCard/ItemCard";


const WineSelection = () => {
    const wines = useSelector((state) => state.wine.wines);

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
                            {winesByType.map((wine) => (
                                <ItemCard key={wine.id} item={wine} type="wine" />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WineSelection;
