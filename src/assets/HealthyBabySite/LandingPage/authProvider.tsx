import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "../../../Types";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import { getIsSubmittedFromLocalStorage } from "../../../ErrorHandling";

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
  showAddChildError: boolean;
  setShowAddChildError: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [showAddChildError, setShowAddChildError] = useState<boolean>(
    getIsSubmittedFromLocalStorage()
  );

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
      );
      console.log(firstAvailableChild);

      if (firstAvailableChild) {
        localStorage.setItem(
          "child",
          JSON.stringify({
            name: firstAvailableChild.name,
            DOB: firstAvailableChild.DOB,
            gender: firstAvailableChild.gender,
            weight: firstAvailableChild.weight,
            headSize: firstAvailableChild.headSize,
            height: firstAvailableChild.height,
            profileId: firstAvailableChild.profileId,
            id: firstAvailableChild.id,
          })
        );
        setChildId(firstAvailableChild.id);
      }
    }
  };

  useEffect(() => {
    if (maybeUser) {
      setUser(JSON.parse(maybeUser));
      if (maybeChild) {
        setChildId(JSON.parse(maybeChild).id);
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
          setShowAddChildError,
          showAddChildError,
        }}
      >
        {children}
      </AuthProviderContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthProviderContext = () => useContext(AuthProviderContext);
