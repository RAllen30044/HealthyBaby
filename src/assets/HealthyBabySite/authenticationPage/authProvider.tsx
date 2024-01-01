import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import { User } from "../../../Types";
import { getProfileData } from "../../../api";
import { json } from "react-router-dom";

type LogInfo = "logIn" | "logOut";
export type AuthComponentProviderT = {
  log: LogInfo;
  setLog: React.Dispatch<React.SetStateAction<LogInfo>>;
  isUserValid: (email: string, password: string) => Promise<void>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
const AuthProviderContext = createContext<AuthComponentProviderT>(
  {} as AuthComponentProviderT
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [log, setLog] = useState<LogInfo>("logIn");
  const [user, setUser] = useState<User | null>(null);

  const isUserValid = (email: string, password: string) => {
    return getProfileData().then((users) => {
      const userExist = users.some(
        (user) =>
          user.userEmail.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      if (userExist) {
        toast.success("Success");
        setLog("logOut");
        setUser({ username: email, password: password });
        localStorage.setItem(
          "user",
          JSON.stringify({ username: email, password: password })
        );
        console.log(JSON.stringify(user));

        return;
      } else {
        toast.error("Try Again");
        return;
      }
    });
  };

  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if (maybeUser) {
      setUser(JSON.parse(maybeUser));
      console.log(JSON.parse(maybeUser));
    }
  }, []);

  return (
    <>
      <AuthProviderContext.Provider
        value={{ log, setLog, isUserValid, user, setUser }}
      >
        {children}
      </AuthProviderContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthProviderContext = () => useContext(AuthProviderContext);
