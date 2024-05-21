import {
  ReactNode,
  createContext,
  useContext,

  // useEffect,
  useState,
} from "react";

import { User } from "../../../../Types";
// import { useHistoryIDComponent } from "../../../HistoryProvider";
import { getIsSubmittedFromLocalStorage } from "../../../ErrorHandling";

// type LogInfo = "logIn" | "logOut";
export type AuthComponentProviderT = {
  log: string | null;
  setLog: React.Dispatch<React.SetStateAction<string | null>>;


  user: User | null;
  username: string;
  password: string;
  landingPage: string;
  token: string | null;
  showAddChildError: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setShowAddChildError: React.Dispatch<React.SetStateAction<boolean>>;
  setLandingPage: React.Dispatch<React.SetStateAction<LandingPageT>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

};

const AuthProviderContext = createContext<AuthComponentProviderT>(
  {} as AuthComponentProviderT
);

type LandingPageT = "on" | "off";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [log, setLog] = useState<string | null>("logOut");
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);
  


  const [landingPage, setLandingPage] = useState<LandingPageT>("on");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAddChildError, setShowAddChildError] = useState<boolean>(
    getIsSubmittedFromLocalStorage()
  );


 

  return (
    <>
      <AuthProviderContext.Provider
        value={{
          log,
          setLog,
          user,
          setUser,
       
       
          username,
          setUsername,
          password,
          setPassword,

          landingPage,
          setLandingPage,
          setShowAddChildError,
          showAddChildError,
          token,
          setToken,
        }}
      >
        {children}
      </AuthProviderContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const UseAuthProviderContext = () => useContext(AuthProviderContext);
