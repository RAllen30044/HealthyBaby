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

export const ChildInfoProvider = ({ children }: { children: ReactNode }) => {
  const [childName, setChildName] = useState("");
  const [gender, setGender] = useState("female");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headSize, setHeadSize] = useState("");
  const [DOB, setDOB] = useState("");

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
