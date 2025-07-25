import { useEffect, useRef, useState } from "react";
import { usePost } from "../../../Context/PostContext";
import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { state,getAllUser } = usePost();
  const searchRef = useRef();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const search = state.users.all.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      searchRef.current.value = "";
      setSearchQuery("");
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      if (state.users.all.length === 0) {
        await getAllUser();
      }
    }
    fetchUsers();
  }, []);


  return (
    <div>
      <div className="w-60 md:w-80 relative z-10 flex shadow-lg">
        <input
          type="text"
          ref={searchRef}
          onClick={toggleSearch}
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full outline-none px-4 p-2 rounded-full border border-secondary-text"
          name="search"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {!isSearchOpen ? (
            <label onClick={toggleSearch} for="search">
              <BiSearch size={25} />
            </label>
          ) : (
            <label onClick={toggleSearch} for="search">
              <IoClose size={25} />
            </label>
          )}
        </div>

        {isSearchOpen && (
          <div className="absolute rounded-2xl top-16 left-0 w-full z-100 p-4 bg-secondary-bg text-primary-text shadow-lg">
            <ul className="max-h-60 overflow-y-auto">
              {searchQuery ? (
                search.map((user) => (
                  <Link
                    to={`/profile/${user.username}`}
                    onClick={() => setIsSearchOpen(false)}
                    key={user._id}
                  >
                    <li
                      key={user._id}
                      className="p-2 hover:bg-primary-text hover:text-secondary-bg transition-colors"
                    >
                      <img
                        src={
                          user.avatar ||
                          `https://ui-avatars.com/api/?name=${user.username}&length=1`
                        }
                        alt={user.username}
                        className="w-8 h-8 rounded-full inline-block mr-2"
                      />
                      {user.username}
                    </li>
                  </Link>
                ))
              ) : (
                <li className="p-2 text-gray-500">Search for users...</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
