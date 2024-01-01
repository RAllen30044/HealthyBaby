import { ReactNode, createContext, useContext, useState } from "react";

type LogInfo = "logIn" | "logOut";
export type AuthComponentProviderT = {
  log: LogInfo;
  setLog: React.Dispatch<React.SetStateAction<LogInfo>>;
};
const AuthProviderContext = createContext<AuthComponentProviderT>(
  {} as AuthComponentProviderT
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [log, setLog] = useState<LogInfo>("logIn");
  return (
    <>
      <AuthProviderContext.Provider value={{ log, setLog }}>
        {children}
      </AuthProviderContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthProviderContext=() => useContext(AuthProviderContext);
