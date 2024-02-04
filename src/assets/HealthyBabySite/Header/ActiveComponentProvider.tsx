import { ReactNode, createContext, useContext, useState } from "react";

type TActiveComponent =
  | "illness"
  | "feeding"
  | "napping"
  | "diaper"
  | "addChild";

export type TActiveComponentProvider = {
  activeComponent: TActiveComponent;
  setActiveComponent: React.Dispatch<React.SetStateAction<TActiveComponent>>;
};

const ActiveComponentContext = createContext<TActiveComponentProvider>(
  {} as TActiveComponentProvider
);

export const ActiveComponentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const getActiveComponent = localStorage.getItem("activeComponent");
  const [activeComponent, setActiveComponent] = useState<TActiveComponent>(
    getActiveComponent
      ? JSON.parse(getActiveComponent).activeComponent
      : "addChild"
  );

  return (
    <ActiveComponentContext.Provider
      value={{ activeComponent, setActiveComponent }}
    >
      {children}
    </ActiveComponentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useActiveComponent = () => useContext(ActiveComponentContext);
