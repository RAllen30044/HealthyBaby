import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ChildInfoT,
  DaipersHistoryInfoTypes,
  IllnessType,
  ProfileInfoTypes,
  bottleFeedingInfoType,
  breastFeedingInfoType,
  nappingType,
} from "./Types";
import {
  getBottleFeedingHistoryInfo,
  getBreastFeedingHistoryInfo,
  getChildInfo,
  getDaipersHistory,
  getIllnessHistory,
  getNappingHistory,
  getProfileData,
} from "./api";

export type HistoryIDComponentProvider = {
  bottleFeedHistory: bottleFeedingInfoType[];
  setBottleFeedHistory: React.Dispatch<
    React.SetStateAction<bottleFeedingInfoType[]>
  >;
  breastFeedHistory: breastFeedingInfoType[];
  setBreastFeedHistory: React.Dispatch<
    React.SetStateAction<breastFeedingInfoType[]>
  >;
  diapersHistory: DaipersHistoryInfoTypes[];
  setDiapersHistory: React.Dispatch<
    React.SetStateAction<DaipersHistoryInfoTypes[]>
  >;
  childInfo: ChildInfoT[];
  setChildInfo: React.Dispatch<React.SetStateAction<ChildInfoT[]>>;

  illnessHistory: IllnessType[];
  setIllnessHistory: React.Dispatch<React.SetStateAction<IllnessType[]>>;

  nappingHistory: nappingType[];
  setNappingHistory: React.Dispatch<React.SetStateAction<nappingType[]>>;

  profile: ProfileInfoTypes[];
  setProfile: React.Dispatch<React.SetStateAction<ProfileInfoTypes[]>>;

  fetchProfileInfo: () => Promise<void>;
  fetchBottleFeedingData: () => Promise<void>;
  fetchBreastFeedingData: () => Promise<void>;
  fetchChildInfo: () => Promise<void>;
  fetchDaiperHistory: () => Promise<void>;
  fetchIllnessHistory: () => Promise<void>;
  fetchNappingHistory: () => Promise<void>;
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
  const [childInfo, setChildInfo] = useState<ChildInfoT[]>([]);
  const [diapersHistory, setDiapersHistory] = useState<
    DaipersHistoryInfoTypes[]
  >([]);

  const [nappingHistory, setNappingHistory] = useState<nappingType[]>([]);
  const [illnessHistory, setIllnessHistory] = useState<IllnessType[]>([]);
  const [profile, setProfile] = useState<ProfileInfoTypes[]>([]);

  const fetchProfileInfo = () => getProfileData().then(setProfile);

  const fetchNappingHistory = () => getNappingHistory().then(setNappingHistory);

  const fetchIllnessHistory = () => getIllnessHistory().then(setIllnessHistory);

  const fetchDaiperHistory = () => getDaipersHistory().then(setDiapersHistory);

  const fetchBottleFeedingData = () =>
    getBottleFeedingHistoryInfo().then(setBottleFeedHistory);

  const fetchBreastFeedingData = () =>
    getBreastFeedingHistoryInfo().then(setBreastFeedHistory);

  const fetchChildInfo = () => getChildInfo().then(setChildInfo);

  useEffect(() => {
    fetchProfileInfo().catch((err) => console.log(err));
    fetchBottleFeedingData().catch((err) => console.log(err));
    fetchBreastFeedingData().catch((err) => console.log(err));
    fetchDaiperHistory().catch((err) => console.log(err));
    fetchIllnessHistory().catch((err) => console.log(err));
    fetchChildInfo().catch((err) => {
      console.log(err);
    });
    fetchNappingHistory().catch((err) => console.log(err));
  }, []);


  console.log(profile.filter((username)=>username.username ==="Robert Allen" && username.password==="Inhumane#1"));
  
  
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
        fetchDaiperHistory,
        illnessHistory,
        setIllnessHistory,
        fetchIllnessHistory,
        nappingHistory,
        setNappingHistory,
        fetchNappingHistory,
        profile,
        setProfile,
        fetchProfileInfo,
      }}
    >
      {children}
    </HistoryIDComponentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useHistoryIDComponent = () =>
  useContext(HistoryIDComponentContext);
