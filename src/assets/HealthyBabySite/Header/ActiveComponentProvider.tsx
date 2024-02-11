import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TActiveComponent =
  | "illness"
  | "feeding"
  | "napping"
  | "diaper"
  | "addChild"
  | "editChild"
  | "editProfile";

type Editor = "present" | "not present";
export type TActiveComponentProvider = {
  activeComponent: TActiveComponent;
  setActiveComponent: React.Dispatch<React.SetStateAction<TActiveComponent>>;
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
  const getActiveComponent = localStorage.getItem("activeComponent");
  const [activeComponent, setActiveComponent] = useState<TActiveComponent>(
    getActiveComponent
      ? JSON.parse(getActiveComponent).activeComponent
      : "addChild"
  );
  const [editor, setEditor] = useState<Editor>("not present");

  useEffect(() => {
    if (activeComponent !== "editProfile") {
      setEditor("not present");
    }
  }, [editor, activeComponent]);
  return (
    <ActiveComponentContext.Provider
      value={{ activeComponent, setActiveComponent, editor, setEditor }}
    >
      {children}
    </ActiveComponentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useActiveComponent = () => useContext(ActiveComponentContext);
