import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "@/API/api";
import ItemCard from "@/components/ItemCard/ItemCard";
import { setMenuItems, selectStarters, selectMainCourses, selectDesserts } from "@/store/slices/menuItems";
import { loadWines, selectWines } from "@/store/slices/wines";

const PAGE_SIZE = 6;
const LOAD_STEP = 4;

const TOP_TABS = [
    { id: "drinks", label: "Drinks" },
    { id: "food", label: "Food" },
    { id: "sweets", label: "Sweets" },
];

const MenuPage = () => {
    const dispatch = useDispatch();
    const wines = useSelector(selectWines);
    const starters = useSelector(selectStarters);
    const mainCourses = useSelector(selectMainCourses);
    const desserts = useSelector(selectDesserts);

    const [activeSection, setActiveSection] = useState("drinks");
    const [visibleBySection, setVisibleBySection] = useState({
        drinks: PAGE_SIZE,
        food: PAGE_SIZE,
        sweets: PAGE_SIZE,
    });
    const sectionRefs = useRef({});
    const loadMoreRefs = useRef({});

    useEffect(() => {
        if (starters.length || mainCourses.length || desserts.length) return;
        const fetchMenuItems = async () => {
            try {
                const res = await api.get("menuitems/");
                dispatch(setMenuItems(res.data));
            } catch (error) {
                console.error("Failed to fetch menu items", error);
            }
        };
        fetchMenuItems();
    }, [dispatch, starters.length, mainCourses.length, desserts.length]);

    useEffect(() => {
        if (wines.length) return;
        const fetchWines = async () => {
            try {
                const res = await api.get("wines/");
                dispatch(loadWines(res.data));
            } catch (error) {
                console.error("Failed to fetch wines", error);
            }
        };
        fetchWines();
    }, [dispatch, wines.length]);

    const sections = useMemo(
        () => [
            {
                id: "drinks",
                title: "Summer Drinks",
                type: "wine",
                items: wines,
            },
            {
                id: "food",
                title: "Starters & Kitchen",
                type: "menuItem",
                items: [...starters, ...mainCourses],
            },
            {
                id: "sweets",
                title: "Sweets",
                type: "menuItem",
                items: desserts,
            },
        ],
        [wines, starters, mainCourses, desserts]
    );

    useEffect(() => {
        const getClosestSection = () => {
            const offset = 170;
            let nextActive = sections[0]?.id || "drinks";

            sections.forEach((section) => {
                const node = sectionRefs.current[section.id];
                if (!node) return;

                const top = node.getBoundingClientRect().top;
                if (top <= offset) {
                    nextActive = section.id;
                }
            });            

            setActiveSection(nextActive);
        };

        getClosestSection();
        window.addEventListener("scroll", getClosestSection, { passive: true });
        window.addEventListener("resize", getClosestSection);

        return () => {
            window.removeEventListener("scroll", getClosestSection);
            window.removeEventListener("resize", getClosestSection);
        };
    }, [sections]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const sectionId = entry.target.getAttribute("data-section-id");
                    const section = sections.find((item) => item.id === sectionId);
                    if (!section) return;

                    setVisibleBySection((prev) => ({
                        ...prev,
                        [sectionId]: Math.min((prev[sectionId] || PAGE_SIZE) + LOAD_STEP, section.items.length),
                    }));
                });
            },
            { threshold: 0.1 }
        );

        const currentRefs = loadMoreRefs.current;
        Object.values(currentRefs).forEach((node) => node && observer.observe(node));

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (sectionId) => {
        const target = sectionRefs.current[sectionId];
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen bg-[#f38a73] text-[#3f180d] pb-24">
            <div className="sticky top-14 z-40 bg-[#f38a73] border-b border-[#8c4a3f]/40">
                <div className="overflow-x-auto whitespace-nowrap px-2">
                    {TOP_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => scrollToSection(tab.id)}
                            className={`uppercase tracking-[0.2em] text-xs sm:text-sm px-4 py-4 border-b-4 ${activeSection === tab.id ? "border-[#6f2f24] font-bold" : "border-transparent opacity-70"}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {sections.map((section) => {
                const visibleCount = visibleBySection[section.id] || PAGE_SIZE;
                const visibleItems = section.items.slice(0, visibleCount);
                const bannerImage = section.items[0]?.image_item;

                return (
                    <section
                        key={section.id}
                        id={section.id}
                        ref={(node) => {
                            sectionRefs.current[section.id] = node;
                        }}
                        className="scroll-mt-36"
                    >
                        {bannerImage && (
                            <div className="px-4 pt-4">
                                <div className="relative h-36 sm:h-44 overflow-hidden border-[10px] border-[#7a392d] bg-[#7a392d]">
                                    <img src={bannerImage} alt={`${section.title} banner`} className="h-full w-full object-cover opacity-90" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2f130c]/40 to-transparent" />
                                    <h2 className="absolute inset-0 flex items-center justify-center text-white text-3xl uppercase tracking-wide font-bold">
                                        {section.title}
                                    </h2>
                                </div>
                            </div>
                        )}

                        <div className="px-4 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {visibleItems.map((item) => (
                                <ItemCard key={`${section.type}-${item.id}`} item={item} type={section.type} />
                            ))}
                        </div>

                        {section.items.length > visibleCount && (
                            <div
                                ref={(node) => {
                                    loadMoreRefs.current[section.id] = node;
                                }}
                                data-section-id={section.id}
                                className="h-14 flex items-center justify-center text-sm tracking-wide opacity-80"
                            >
                                Scroll to load more
                            </div>
                        )}

                        {!section.items.length && (
                            <div className="px-4 py-10 text-center text-lg">No items available in this section yet.</div>
                        )}
                    </section>
                );
            })}
        </div>
    );
};

export default MenuPage;
