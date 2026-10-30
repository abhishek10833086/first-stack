import React from "react";

type MainContextType = {
  name: string;
  email: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  user: {
    name: string;
    email: string;
  }[];
  setUser: React.Dispatch<
    React.SetStateAction<{ name: string; email: string }[]>
  >;
};

const MainContext = React.createContext<MainContextType | null>(null);

export const useMainContext = () => {
  const context = React.useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within MainContextProvider");
  }

  return context;
};

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = React.useState("John Doe");
  const [email, setEmail] = React.useState("john.doe@example.com");
  const [user, setUser] = React.useState<
    {
      name: string;
      email: string;
    }[]
  >([]);

  return (
    <MainContext.Provider
      value={{ name, email, user, setName, setEmail, setUser }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
