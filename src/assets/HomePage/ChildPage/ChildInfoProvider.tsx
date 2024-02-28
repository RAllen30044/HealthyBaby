import { ReactNode, createContext, useContext, useState } from "react";
type CheveronPostion = "up" | "down";
export type TChildInfoProvider = {
  childName: string;
  setChildName: React.Dispatch<React.SetStateAction<string>>;
  DOB: string;
  setDOB: React.Dispatch<React.SetStateAction<string>>;
  weight: string;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  headSize: string;
  setHeadSize: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  currentChildId: string;
  setCurrentChildId: React.Dispatch<React.SetStateAction<string>>;
  cheveronPosition: CheveronPostion;
  setCheveronPosition: React.Dispatch<React.SetStateAction<CheveronPostion>>;
  hiddenPagesLinks: boolean;
  setHiddenPagesLinks: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChildInfoContext = createContext<TChildInfoProvider>(
  {} as TChildInfoProvider
);
const getCurrentChildInfo = localStorage.getItem("child");

export const ChildInfoProvider = ({ children }: { children: ReactNode }) => {
  const [childName, setChildName] = useState(
    getCurrentChildInfo
      ? JSON.parse(getCurrentChildInfo).name
      : "Couldn't find name"
  );
  const [gender, setGender] = useState(
    getCurrentChildInfo
      ? JSON.parse(getCurrentChildInfo).gender
      : "Couldn't find gender"
  );
  const [weight, setWeight] = useState(
    getCurrentChildInfo
      ? JSON.parse(getCurrentChildInfo).weight
      : "Couldn't find Weight"
  );
  const [height, setHeight] = useState(
    getCurrentChildInfo
      ? JSON.parse(getCurrentChildInfo).height
      : "Couldn't find height"
  );
  const [headSize, setHeadSize] = useState(
    getCurrentChildInfo
      ? JSON.parse(getCurrentChildInfo).headSize
      : "Couldn't find head size"
  );
  const [DOB, setDOB] = useState(
    getCurrentChildInfo
      ? JSON.parse(getCurrentChildInfo).DOB
      : "Couldn't find DOB"
  );
  const [currentChildId, setCurrentChildId] = useState(
    getCurrentChildInfo
      ? JSON.parse(getCurrentChildInfo).id
      : "Couldn't locate id"
  );
  const [hiddenPagesLinks, setHiddenPagesLinks] = useState(false);
  const [cheveronPosition, setCheveronPosition] =
    useState<CheveronPostion>("down");
  return (
    <ChildInfoContext.Provider
      value={{
        childName,
        setChildName,
        gender,
        setGender,
        DOB,
        setDOB,
        headSize,
        setHeadSize,
        height,
        setHeight,
        weight,
        setWeight,
        currentChildId,
        setCurrentChildId,
        cheveronPosition,
        setCheveronPosition,
        hiddenPagesLinks,
        setHiddenPagesLinks,
      }}
    >
      {children}
    </ChildInfoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChildInfo = () => useContext(ChildInfoContext);
