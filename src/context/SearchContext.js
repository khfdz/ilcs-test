import React, { createContext, useContext, useState} from "react";

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredLocations, setFilteredLocations] = useState([]);

  const updateSearchQuery = (query, locations = []) => {
    setSearchQuery(query);

    const filtered = locations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredLocations(filtered);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        updateSearchQuery,
        filteredLocations,
        setFilteredLocations, 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
