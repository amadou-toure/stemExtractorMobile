// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface SelectedThemeContextType {
//   selectedTheme:  | undefined;
//   setSelectedTheme: React.Dispatch<React.SetStateAction<ThemeStems | undefined>>;
// }

// const SelectedThemeContext = createContext<SelectedThemeContextType | undefined>(
//   undefined
// );

// export const SelectedThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [selectedTheme, setSelectedTheme] = useState<ThemeStems | undefined>(
//     undefined
//   );

//   return (
//     <SelectedThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
//       {children}
//     </SelectedThemeContext.Provider>
//   );
// };

// export const useSelectedTheme = (): SelectedThemeContextType => {
//   const context = useContext(SelectedThemeContext);
//   if (!context) {
//     throw new Error(
//       "useSelectedTheme must be used within a SelectedThemeProvider"
//     );
//   }
//   return context;
// };
