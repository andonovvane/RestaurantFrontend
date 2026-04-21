import ItemCard from "@/components/ItemCard/ItemCard";

const MenuCategory = ({ items }) => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-5">
            {items.map((item) => (
                <ItemCard key={item.id} item={item} type="menuItem" />
            ))}
        </div>
    );
};

export default MenuCategory;