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
  maybeChild: string | null;
  user: User | null;
  username: string;
  password: string;
  landingPage: string;
  setLandingPage: React.Dispatch<React.SetStateAction<LandingPageT>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loggedIn: (email: string, password: string) => void;
};

const AuthProviderContext = createContext<AuthComponentProviderT>(
  {} as AuthComponentProviderT
);

type LandingPageT = "on" | "off";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [log, setLog] = useState<string | null>("logOut");
  const [user, setUser] = useState<User | null>(null);
  const { profile, childInfo, setChildId } = useHistoryIDComponent();
  const maybeUser = localStorage.getItem("user");
  const maybeChild = localStorage.getItem("child");
  const [landingPage, setLandingPage] = useState<LandingPageT>("on");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const loggedIn = (username: string, password: string) => {
    setLog("logOut");
    const userID = profile.find(
      (profile) =>
        profile.username.toLowerCase() === username.toLowerCase() &&
        profile.password === password
    );

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
      if (maybeChild) {
        setChildId(Number.parseInt(JSON.parse(maybeChild).id));
      }

      setLog(localStorage.getItem("log" || "logIn"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maybeUser, maybeChild]);

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
          maybeChild,
          landingPage,
          setLandingPage,
        }}
      >
        {children}
      </AuthProviderContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthProviderContext = () => useContext(AuthProviderContext);
