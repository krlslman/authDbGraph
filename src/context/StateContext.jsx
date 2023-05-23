import React, { createContext, useState, useContext } from 'react'
import defaultData from '/src/data/data.json'

// Create the context
const StateContext = createContext();

// Create the StateContextProvider component
export const StateContextProvider = ({ children }) => {
  const [dataSource, setDataSource] = useState(defaultData);
  const [filteredDataSource, setFilteredDataSource] = useState(dataSource);
  const [ filterWarehouse, setFilterWarehouse ] = useState("");  
  const [radioFilter, setRadioFilter] = useState("All");
  const [isConnected, setIsConnected] = useState(false);

  // Create the context value
  const contextValue = {
    dataSource,
    setDataSource,
    filteredDataSource,
    setFilteredDataSource,
    filterWarehouse,
    setFilterWarehouse,
    radioFilter,
    setRadioFilter,
    isConnected,
    setIsConnected,
  };

  // Provide the context value to children
  return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
};

// Custom hook to access the state context
export const useStateContext = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('useStateContext must be used within a StateContextProvider');
  }

  return context;
};




//--------------------------------------------------------------------------------
// import React, { createContext, useState, useContext } from 'react';

// // Define the shape of the state
// interface StateContextValue {
//   dataSource: any[];
//   setDataSource: React.Dispatch<React.SetStateAction<any[]>>;
// }

// // Create the context
// const StateContext = createContext<StateContextValue | undefined>(undefined);

// interface StateContextProps {
//   children: React.ReactNode;
// }


// // Create the StateContextProvider component
// export const StateContextProvider: React.FC<StateContextProps> = ({ children }) => {
//   const [dataSource, setDataSource] = useState<any[]>([]);
  
//   // Create the context value
//   const contextValue: StateContextValue = {
//     dataSource,
//     setDataSource,
//   };
//   // Provide the context value to children
//   return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
// };



// // Custom hook to access the state context
// export const useStateContext = () => {
//   const context = useContext(StateContext);

//   if (!context) {
//     throw new Error('useStateContext must be used within a StateContextProvider');
//   }

//   return context;
// };
