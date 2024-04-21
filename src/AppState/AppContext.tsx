import React, { createContext, useContext, useState } from 'react';

interface AppContextProps {
  mode: 'null' | 'setting' | 'play';
  setMode: (mode: 'setting' | 'play') => void;
}

const AppContext = createContext<AppContextProps>({
  mode: 'setting',
  setMode: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'setting' | 'play'>('setting');

  const value: AppContextProps = {
    mode,
    setMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
