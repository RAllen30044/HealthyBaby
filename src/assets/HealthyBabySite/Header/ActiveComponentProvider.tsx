import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type TActiveHomePageComponent =
  | "illness"
  | "feeding"
  | "napping"
  | "diaper"
  | "";
type TActiveMainComponent =
  | "addChild"
  | "editChild"
  | "editProfile"
  | "landingPage"
  | "about"
  | "home"
  | "signUp";

type NameColors = "#fadd9f" | "#12d7e6" | "#b935f9" | "#96cbb6" | "black";
type Editor = "present" | "not present";

export type TActiveComponentProvider = {
  activeHomePageComponent: TActiveHomePageComponent;
  setActiveHomePageComponent: React.Dispatch<
    React.SetStateAction<TActiveHomePageComponent>
  >;
  nameColors: NameColors;
  setNameColors: React.Dispatch<React.SetStateAction<NameColors>>;
  activeMainComponent: TActiveMainComponent;
  setActiveMainComponent: React.Dispatch<
    React.SetStateAction<TActiveMainComponent>
  >;
  editor: string;
  setEditor: React.Dispatch<React.SetStateAction<Editor>>;
  switchColors: (activeComponent: TActiveHomePageComponent) => string;
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
  const [nameColors, setNameColors] = useState<NameColors>("black");

  const switchColors = (activeComponent: TActiveHomePageComponent): string => {
    switch (activeComponent) {
      case "napping":
        return "#b935f9";
      case "diaper":
        return "#12d7e6";
      case "feeding":
        return "#fadd9f";
      case "illness":
        return "coral";

      default:
        return "black";
    }
  };

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
        nameColors,
        setNameColors,
        switchColors,
      }}
    >
      {children}
    </ActiveComponentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useActiveComponent = () => useContext(ActiveComponentContext);
