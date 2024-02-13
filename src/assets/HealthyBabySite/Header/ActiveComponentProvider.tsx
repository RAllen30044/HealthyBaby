import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TActiveHomePageComponent = "illness" | "feeding" | "napping" | "diaper";
type TActiveMainComponent =
  | "addChild"
  | "editChild"
  | "editProfile"
  | "landingPage"
  | "about"
  | "home"
  | "signUp";

type Editor = "present" | "not present";
export type TActiveComponentProvider = {
  activeHomePageComponent: TActiveHomePageComponent;
  setActiveHomePageComponent: React.Dispatch<
    React.SetStateAction<TActiveHomePageComponent>
  >;
  activeMainComponent: TActiveMainComponent;
  setActiveMainComponent: React.Dispatch<
    React.SetStateAction<TActiveMainComponent>
  >;
  editor: string;
  setEditor: React.Dispatch<React.SetStateAction<Editor>>;
};

const ActiveComponentContext = createContext<TActiveComponentProvider>(
  {} as TActiveComponentProvider
);

export const ActiveComponentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const getActiveHomePageComponent = localStorage.getItem(
    "activeHomePageComponent"
  );
  const getActiveMainComponent = localStorage.getItem("activeMainComponent");
  const [activeHomePageComponent, setActiveHomePageComponent] =
    useState<TActiveHomePageComponent>(
      getActiveHomePageComponent
        ? JSON.parse(getActiveHomePageComponent).activeHomePageComponent
        : "feeding"
    );
  const [activeMainComponent, setActiveMainComponent] =
    useState<TActiveMainComponent>(
      getActiveMainComponent
        ? JSON.parse(getActiveMainComponent).activeMainComponent
        : "landingPage"
    );
  const [editor, setEditor] = useState<Editor>("not present");

  useEffect(() => {
    if (activeMainComponent !== "editProfile") {
      setEditor("not present");
    }
  }, [editor, activeMainComponent]);
  return (
    <ActiveComponentContext.Provider
      value={{
        activeHomePageComponent,
        setActiveHomePageComponent,
        activeMainComponent,
        setActiveMainComponent,
        editor,
        setEditor,
      }}
    >
      {children}
    </ActiveComponentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useActiveComponent = () => useContext(ActiveComponentContext);
