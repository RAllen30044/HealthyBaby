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
  ProfileInfoTypes,
  bottleFeedingInfoType,
  breastFeedingInfoType,
  eatingInfoType,
  nappingType,
} from "../Types";
import {
  getBottleFeedingHistoryInfo,
  getBreastFeedingHistoryInfo,
  getChildInfo,
  getDiapersHistory,
  getIllnessHistory,
  getMealHistoryInfo,
  getNappingHistory,
  getProfileData,
} from "../clientApi";
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
  childInfo: ChildInfoT[];
  setChildInfo: React.Dispatch<React.SetStateAction<ChildInfoT[]>>;

  illnessHistory: IllnessType[];
  setIllnessHistory: React.Dispatch<React.SetStateAction<IllnessType[]>>;

  nappingHistory: nappingType[];
  setNappingHistory: React.Dispatch<React.SetStateAction<nappingType[]>>;

  profile: ProfileInfoTypes[];
  setProfile: React.Dispatch<React.SetStateAction<ProfileInfoTypes[]>>;
  child: object;
  setChild: React.Dispatch<React.SetStateAction<object>>;

  fetchProfileInfo: () => Promise<void>;
  fetchBottleFeedingData: () => Promise<void>;
  fetchBreastFeedingData: () => Promise<void>;
  fetchMealData: () => Promise<void>;
  fetchChildInfo: () => Promise<void>;
  fetchDiaperHistory: () => Promise<void>;
  fetchIllnessHistory: () => Promise<void>;
  fetchNappingHistory: () => Promise<void>;

  childId: number;
  setChildId: React.Dispatch<React.SetStateAction<number>>;

  profileId: number;
  setProfileId: React.Dispatch<React.SetStateAction<number>>;

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
  const [childInfo, setChildInfo] = useState<ChildInfoT[]>([]);
  const [diapersHistory, setDiapersHistory] = useState<
    DiapersHistoryInfoTypes[]
  >([]);

  const [nappingHistory, setNappingHistory] = useState<nappingType[]>([]);
  const [illnessHistory, setIllnessHistory] = useState<IllnessType[]>([]);
  const [profile, setProfile] = useState<ProfileInfoTypes[]>([]);
  const [childId, setChildId] = useState<number>(0);


 
  const getUser = localStorage.getItem("user");
  const maybeUserId = getUser ? JSON.parse(getUser).id : null;

  const [profileId, setProfileId] = useState<number>(maybeUserId);
  const [child, setChild] = useState({});
  const getSortingDirection = localStorage.getItem("sortDirection");
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    JSON.parse(JSON.stringify(getSortingDirection)) || "asc"
  );

  const fetchProfileInfo = () => getProfileData().then(setProfile);

  const fetchNappingHistory = () => getNappingHistory().then(setNappingHistory);

  const fetchIllnessHistory = () => getIllnessHistory().then(setIllnessHistory);

  const fetchDiaperHistory = () => getDiapersHistory().then(setDiapersHistory);

  const fetchBottleFeedingData = () =>
    getBottleFeedingHistoryInfo().then(setBottleFeedHistory);
  const fetchMealData = () => getMealHistoryInfo().then(setMealHistory);

  const fetchBreastFeedingData = () =>
    getBreastFeedingHistoryInfo().then(setBreastFeedHistory);

  const fetchChildInfo = () => getChildInfo().then(setChildInfo);

  useEffect(() => {
    fetchProfileInfo().catch((err) => console.log(err));
    fetchBottleFeedingData().catch((err) => console.log(err));
    fetchBreastFeedingData().catch((err) => console.log(err));
    fetchMealData().catch((err) => console.log(err));
    fetchDiaperHistory().catch((err) => console.log(err));
    fetchIllnessHistory().catch((err) => console.log(err));
    fetchChildInfo().catch((err) => {
      console.log(err);
    });
    fetchNappingHistory().catch((err) => console.log(err));
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
        childInfo,
        setChildInfo,
        fetchChildInfo,
        diapersHistory,
        setDiapersHistory,
        fetchDiaperHistory,
        illnessHistory,
        setIllnessHistory,
        fetchIllnessHistory,
        nappingHistory,
        setNappingHistory,
        fetchNappingHistory,
        profile,
        setProfile,
        fetchProfileInfo,
        mealHistory,
        setMealHistory,
        fetchMealData,
        childId,
        setChildId,
        profileId,
        setProfileId,
        child,
        setChild,
        setSortDirection,
        sortDirection,
      }}
    >
      {children}
    </HistoryIDComponentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useHistoryIDComponent = () =>
  useContext(HistoryIDComponentContext);
