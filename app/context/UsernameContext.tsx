"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UsernameContextType {
  username: string;
  setUsername: (username: string) => void;
  score: number;
  setScore: (score: number) => void;
}

const UsernameContext = createContext<UsernameContextType | undefined>(
  undefined
);

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);

  return (
    <UsernameContext.Provider value={{ username, setUsername, score, setScore }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => {
  const context = useContext(UsernameContext);
  if (!context) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
};
