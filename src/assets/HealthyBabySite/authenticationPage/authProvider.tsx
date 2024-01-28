import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "../../../Types";
import { useHistoryIDComponent } from "../../../HistoryProvider";

// type LogInfo = "logIn" | "logOut";
export type AuthComponentProviderT = {
  log: string | null;
  setLog: React.Dispatch<React.SetStateAction<string | null>>;
  maybeUser: string | null;
  user: User | null;
  email: string;
  password:string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loggedIn: (email: string, password: string) => void;

};

const AuthProviderContext = createContext<AuthComponentProviderT>(
  {} as AuthComponentProviderT
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [log, setLog] = useState<string | null>("logIn");
  const [user, setUser] = useState<User | null>(null);
  const { profile } = useHistoryIDComponent();
  const maybeUser = localStorage.getItem("user");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const loggedIn = (email: string, password: string) => {
    setLog("logOut");
    const userID = profile.find(
      (profile) => profile.username === email && profile.password === password
    );
    console.log(userID);
    if (userID) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: userID.username,
          password: userID.password,
          id: userID.id,
        })
      );
      localStorage.setItem("log", "logOut");
    }
  };

  useEffect(() => {
    if (maybeUser) {
      setUser(JSON.parse(maybeUser));
      setLog(localStorage.getItem("log" || "logIn"));
    }
  }, [maybeUser]);

  console.log(user);

  return (
    <>
      <AuthProviderContext.Provider
        value={{ log, setLog, user, setUser, loggedIn, maybeUser,email,setEmail, password, setPassword }}
      >
        {children}
      </AuthProviderContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthProviderContext = () => useContext(AuthProviderContext);
