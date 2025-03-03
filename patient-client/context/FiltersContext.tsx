import React, { createContext, useContext, useState } from "react";

// Define the shape of the filter context
interface FiltersContextType {
  selectedFilter: string;
  selectedFilterName: string;
  filterType: string;
  setSelectedFilter: (filter: string) => void;
  setSelectedFilterName: (name: string) => void;
  setFilterType: (type: string) => void;
}

// Create the context with a default value of `null`
const FiltersContext = createContext<FiltersContextType | null>(null);

// FiltersProvider component that wraps the entire app
export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedFilterName, setSelectedFilterName] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");

  return (
    <FiltersContext.Provider
      value={{
        selectedFilter,
        selectedFilterName,
        filterType,
        setSelectedFilter,
        setSelectedFilterName,
        setFilterType,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

// Custom hook to use the FiltersContext
export const useFilters = () => {
  const context = useContext(FiltersContext);
  console.log(context);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
