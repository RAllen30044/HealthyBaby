import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChildInfoT } from "../../../Types";
import { useHistoryIDComponent } from "../../../HistoryProvider";

export type ChildrenProviderType = {
  hasChildren: boolean;
  setHasChildren: React.Dispatch<React.SetStateAction<boolean>>;
  myChildren: ChildInfoT[];
  setMyChildren: React.Dispatch<React.SetStateAction<ChildInfoT[]>>;
};

const ChildrenProviderContext = createContext<ChildrenProviderType>(
  {} as ChildrenProviderType
);
export const ChilderenProvider = ({ children }: { children: ReactNode }) => {
  const [hasChildren, setHasChildren] = useState<boolean>(false);

  const [myChildren, setMyChildren] = useState<ChildInfoT[]>([]);
  const { childInfo, profileId } = useHistoryIDComponent();

  console.log(myChildren);

  useEffect(() => {
    setMyChildren(
      childInfo
        .filter((info) => info.profileId === profileId)
        .map((child) => child)
    );


    if (myChildren.length > 0) {
      setHasChildren(true);
    } else {
      setHasChildren(false);
    }
  }, [setMyChildren, profileId, myChildren.length, childInfo]);



  return (
    <>
      <ChildrenProviderContext.Provider
        value={{ hasChildren, setHasChildren, myChildren, setMyChildren }}
      >
        {children}
      </ChildrenProviderContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChildrenProviderContext = () =>
  useContext(ChildrenProviderContext);
