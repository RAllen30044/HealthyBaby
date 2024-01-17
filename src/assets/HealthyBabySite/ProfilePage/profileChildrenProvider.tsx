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
  sethasChildren: React.Dispatch<React.SetStateAction<boolean>>;
  myChildren: ChildInfoT[];
  setMyChildren:React.Dispatch<React.SetStateAction<ChildInfoT[]>>
};

const ChildrenProviderContext = createContext<ChildrenProviderType>(
  {} as ChildrenProviderType
);
export const ChilderenProvider = ({ children }: { children: ReactNode }) => {
  const [hasChildren, sethasChildren] = useState<boolean>(false);

  const [myChildren, setMyChildren] = useState<ChildInfoT[]>([]);
  const { childInfo, profileId } = useHistoryIDComponent();

  console.log(myChildren);

  useEffect(() => {
    const userHasAddedChildren = (childInfo: ChildInfoT[]): boolean => {
      return (
        childInfo
          .filter((info) => info.profileId === profileId)
          .map((child) => child).length > 0
      );
    };
    setMyChildren(
      childInfo
        .filter((info) => info.profileId === profileId)
        .map((child) => child)
    );
    if (userHasAddedChildren(childInfo)) {
      sethasChildren(true);
    } else {
      sethasChildren(false);
    }
  }, [sethasChildren, childInfo, profileId]);

  return (
    <>
      <ChildrenProviderContext.Provider value={{ hasChildren, sethasChildren,myChildren,setMyChildren }}>
        {children}
      </ChildrenProviderContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChildrenProviderContext = () =>
  useContext(ChildrenProviderContext);
