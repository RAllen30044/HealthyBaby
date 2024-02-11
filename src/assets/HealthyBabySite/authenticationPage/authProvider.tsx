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
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
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
  const { profile, childInfo, setChildId } = useHistoryIDComponent();
  const maybeUser = localStorage.getItem("user");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const getChild = localStorage.getItem("child");

  const loggedIn = (username: string, password: string) => {
    setLog("logOut");
    const userID = profile.find(
      (profile) =>
        profile.username.toLowerCase() === username.toLowerCase() &&
        profile.password === password
    );
    // const userIdExist = profile.some(
    //   (profile) =>
    //     profile.username.toLowerCase() === username.toLowerCase() &&
    //     profile.password === password
    // );

    if (userID) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: userID.username,
          password: userID.password,
          caregiver: userID.caregiver,
          id: userID.id,
        })
      );
      localStorage.setItem("log", "logIn");
      const firstAvailableChild = childInfo.find(
        (child) => child.profileId === userID.id
      )?.id;
      if (firstAvailableChild) {
        setChildId(firstAvailableChild);
      }
    }
  };

  useEffect(() => {
    if (maybeUser) {
      setUser(JSON.parse(maybeUser));
      if (getChild) {
        setChildId(Number.parseInt(JSON.parse(getChild).id));
      }

      setLog(localStorage.getItem("log" || "logIn"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maybeUser, getChild]);



  return (
    <>
      <AuthProviderContext.Provider
        value={{
          log,
          setLog,
          user,
          setUser,
          loggedIn,
          maybeUser,
          username,
          setUsername,
          password,
          setPassword,
        }}
      >
        {children}
      </AuthProviderContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthProviderContext = () => useContext(AuthProviderContext);
