import SearchIcon from "../../assets/searchicon.png";

const SearchBar = () => {

    return (
        <>
                <div className="flex items-center bg-black border-2 border-neutral-600 rounded-full w-[88%] mx-4 px-8 py-1 text-white">
                    <img className="w-5 h-5 ml-2" src={SearchIcon} alt="search icon" />
                    <input
                        className="bg-transparent w-full px-4 py-2 focus:outline-none placeholder-gray-400"
                        type="text"
                        placeholder="Search ..."
                    />
                </div>
        </>
    );
};

export default SearchBar;
