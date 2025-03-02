import React, { createContext, useContext, useState } from "react";

const FiltersContext = createContext(null);

export const FiltersProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState(""); // track filter id
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedFilterName, setSelectedFilterName] = useState("");
  const [filterType, setFilterType] = useState(""); // New state to track if it's a symptom or specialty

  return (
    <FiltersContext.Provider
      value={{
        selectedFilter,
        setSelectedFilter,
        selectedPrice,
        setSelectedPrice,
        selectedFilterName,
        setSelectedFilterName,
        filterType,
        setFilterType,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
