import { ReactNode, createContext, useContext, useState } from "react";
type ChevronPosition = "up" | "down";
type UnitOfMeasurement = "mL" | "oz";

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
  currentChildId: number;
  setCurrentChildId: React.Dispatch<React.SetStateAction<number>>;
  chevronPosition: ChevronPosition;
  setChevronPosition: React.Dispatch<React.SetStateAction<ChevronPosition>>;
  hiddenPagesLinks: boolean;
  setHiddenPagesLinks: React.Dispatch<React.SetStateAction<boolean>>;
  unitOfMeasurement: UnitOfMeasurement;
  setUnitOfMeasurement: React.Dispatch<React.SetStateAction<UnitOfMeasurement>>;
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
  const [chevronPosition, setChevronPosition] =
    useState<ChevronPosition>("down");

  const [unitOfMeasurement, setUnitOfMeasurement] = useState<UnitOfMeasurement>(
    JSON.parse(JSON.stringify(localStorage.getItem("unitOfMeasurement"))) ||
      "mL"
  );

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
        chevronPosition,
        setChevronPosition,
        hiddenPagesLinks,
        setHiddenPagesLinks,
        unitOfMeasurement,
        setUnitOfMeasurement,
      }}
    >
      {children}
    </ChildInfoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChildInfo = () => useContext(ChildInfoContext);
