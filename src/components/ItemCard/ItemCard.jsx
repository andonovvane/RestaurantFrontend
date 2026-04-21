import { useCartToggle } from "@/hooks/useCartToggle";

const ItemCard = ({ item, type }) => {
    const { toggleItem, isInCart } = useCartToggle();
    const inCart = isInCart(item.id, type);

    const imageUrl = item.image_item;
    const description = type === "wine"
        ? item.description
        : item.ingredients?.map((ing) => ing.name).join(", ");
    const buttonText = inCart ? "Added to Order List" : "Add to Order List";
    const imageClassName = type === "wine" ? "w-full h-52 object-cover" : "w-full h-52 object-cover";

    return (
        <div className="flex flex-col w-full bg-[#f6a08e] border border-[#8c4a3f]/45 overflow-hidden shadow-md">
            <img
                src={imageUrl}
                alt={item.name}
                className={imageClassName}
            />
            <div className="flex-1 flex flex-col justify-between p-4 text-[#41190f]">
                <h3 className="text-2xl font-extrabold uppercase tracking-wide leading-tight">
                    {item.name}
                </h3>
                <p className="text-sm mt-2 min-h-10 line-clamp-2 opacity-85">
                    {description}
                </p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-black">
                        CHF {item.price}
                    </span>
                    <button
                        onClick={() => toggleItem(item, type)}
                        className={`px-3 py-2 text-xs uppercase tracking-wide transition ${inCart ? "bg-[#6f2f24] text-white" : "bg-[#fbe0d8] border border-[#6f2f24]/30 text-[#6f2f24]"}`}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;