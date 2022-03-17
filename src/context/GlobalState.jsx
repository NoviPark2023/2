import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  stanovi: {
    data: [],
    searchText: '',
    searchedColumn: '',
  },
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        stanovi: state.stanovi,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
