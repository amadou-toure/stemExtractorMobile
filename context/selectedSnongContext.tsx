import React, { createContext, useContext, useState, ReactNode } from "react";
import { SongStems } from "../src/types/types";



interface SelectedSongContextType {
  selectedSong: SongStems | undefined;
  setSelectedSong: React.Dispatch<React.SetStateAction<SongStems | undefined>>;
}

const SelectedSongContext = createContext<SelectedSongContextType | undefined>(
  undefined
);

export const SelectedSongProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSong, setSelectedSong] = useState<SongStems | undefined>(
    undefined
  );

  return (
    <SelectedSongContext.Provider value={{ selectedSong, setSelectedSong }}>
      {children}
    </SelectedSongContext.Provider>
  );
};

export const useSelectedSong = (): SelectedSongContextType => {
  const context = useContext(SelectedSongContext);
  if (!context) {
    throw new Error(
      "useSelectedSong must be used within a SelectedSongProvider"
    );
  }
  return context;
};
