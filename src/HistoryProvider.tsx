import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ChildInfoT,
  DiapersHistoryInfoTypes,
  IllnessType,
  bottleFeedingInfoType,
  breastFeedingInfoType,
  eatingInfoType,
  nappingType,
} from "../Types";
import {
  getBottleFeedingHistoryInfo,
  getBreastFeedingHistoryInfo,
  getDiapersHistory,
  getIllnessHistory,
  getMealHistoryInfo,
  getNappingHistory,
  getProfilesChildren,
} from "../callApis";

type SortDirection = "asc" | "desc";

export type HistoryIDComponentProvider = {
  bottleFeedHistory: bottleFeedingInfoType[];
  setBottleFeedHistory: React.Dispatch<
    React.SetStateAction<bottleFeedingInfoType[]>
  >;
  breastFeedHistory: breastFeedingInfoType[];
  setBreastFeedHistory: React.Dispatch<
    React.SetStateAction<breastFeedingInfoType[]>
  >;
  mealHistory: eatingInfoType[];
  setMealHistory: React.Dispatch<React.SetStateAction<eatingInfoType[]>>;
  diapersHistory: DiapersHistoryInfoTypes[];
  setDiapersHistory: React.Dispatch<
    React.SetStateAction<DiapersHistoryInfoTypes[]>
  >;

  illnessHistory: IllnessType[];
  setIllnessHistory: React.Dispatch<React.SetStateAction<IllnessType[]>>;

  nappingHistory: nappingType[];
  setNappingHistory: React.Dispatch<React.SetStateAction<nappingType[]>>;

  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;

  fetchBottleFeedingData: () => Promise<void>;
  fetchBreastFeedingData: () => Promise<void>;
  fetchMealData: () => Promise<void>;

  fetchDiaperHistory: () => Promise<void>;
  fetchIllnessHistory: () => Promise<void>;
  fetchNappingHistory: () => Promise<void>;

  childId: number;
  setChildId: React.Dispatch<React.SetStateAction<number>>;

  profileChildren: ChildInfoT[];
  setProfileChildren: React.Dispatch<React.SetStateAction<ChildInfoT[]>>;

  profileUsername: string;
  setProfileUsername: React.Dispatch<React.SetStateAction<string>>;

  sortDirection: SortDirection;
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
};

const HistoryIDComponentContext = createContext<HistoryIDComponentProvider>(
  {} as HistoryIDComponentProvider
);

export const HistoryIDComponentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [bottleFeedHistory, setBottleFeedHistory] = useState<
    bottleFeedingInfoType[]
  >([]);
  const [breastFeedHistory, setBreastFeedHistory] = useState<
    breastFeedingInfoType[]
  >([]);
  const [mealHistory, setMealHistory] = useState<eatingInfoType[]>([]);

  const [diapersHistory, setDiapersHistory] = useState<
    DiapersHistoryInfoTypes[]
  >([]);
  const [profileChildren, setProfileChildren] = useState<ChildInfoT[]>([]);
  const [nappingHistory, setNappingHistory] = useState<nappingType[]>([]);
  const [illnessHistory, setIllnessHistory] = useState<IllnessType[]>([]);

  const getId = localStorage.getItem("childId");

  const [childId, setChildId] = useState<number>(
    getId ? Number.parseInt(getId) : 0
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [profileUsername, setProfileUsername] = useState<string>("");
 
  const getSortingDirection = localStorage.getItem("sortDirection");
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    JSON.parse(JSON.stringify(getSortingDirection)) || "asc"
  );

  useEffect(() => {
    if (token) {
      getProfilesChildren(token).then(setProfileChildren);
    }
  }, [token]);

  const fetchNappingHistory = () => getNappingHistory().then(setNappingHistory);

  const fetchIllnessHistory = () => getIllnessHistory().then(setIllnessHistory);

  const fetchDiaperHistory = () => getDiapersHistory().then(setDiapersHistory);

  const fetchBottleFeedingData = () =>
    getBottleFeedingHistoryInfo().then(setBottleFeedHistory);

  const fetchMealData = () => getMealHistoryInfo().then(setMealHistory);

  const fetchBreastFeedingData = () =>
    getBreastFeedingHistoryInfo().then(setBreastFeedHistory);

  useEffect(() => {
    fetchBottleFeedingData().catch((err) => console.log(err));
    fetchBreastFeedingData().catch((err) => console.log(err));
    fetchMealData().catch((err) => console.log(err));
    fetchDiaperHistory().catch((err) => console.log(err));
    fetchIllnessHistory().catch((err) => console.log(err));
  }, []);

  return (
    <HistoryIDComponentContext.Provider
      value={{
        breastFeedHistory,
        setBreastFeedHistory,
        bottleFeedHistory,
        setBottleFeedHistory,
        fetchBottleFeedingData,
        fetchBreastFeedingData,

        diapersHistory,
        setDiapersHistory,
        fetchDiaperHistory,
        illnessHistory,
        setIllnessHistory,
        fetchIllnessHistory,
        nappingHistory,
        setNappingHistory,
        fetchNappingHistory,

        mealHistory,
        setMealHistory,
        fetchMealData,
        childId,
        setChildId,
        profileUsername,
        setProfileUsername,

        setSortDirection,
        sortDirection,

        profileChildren,
        setProfileChildren,
        token,
        setToken,
      }}
    >
      {children}
    </HistoryIDComponentContext.Provider>
  );
};

export const UseHistoryIDComponent = () =>
  useContext(HistoryIDComponentContext);
