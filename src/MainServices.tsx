import { createContext } from "react";
import { useMainContext } from "./MainContextProvider";
import React from "react";

const MainServices = createContext<null | {
  submitUser: () => Promise<any>;
  getUser: () => Promise<any>;
}>(null);

export const useMainServices = () => {
  const context = React.useContext(MainServices);
  if (!context) {
    throw new Error("useMainServices must be used within MainServicesProvider");
  }

  return context;
};

const MainServicesProvider = ({ children }: { children: React.ReactNode }) => {
  const MainContext = useMainContext();
  const submitUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}users`, {
        method: "POST",
        body: JSON.stringify({
          name: MainContext.name,
          email: MainContext.email,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to submit users");
      }
      const data = await response.json();
      getUser();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to submit users");
      }
      const data = await response.json();
      MainContext.setUser(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const services = {
    submitUser,
    getUser,
  };

  return (
    <MainServices.Provider value={services}>{children}</MainServices.Provider>
  );
};
export default MainServicesProvider;
