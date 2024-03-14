export type User = {
  username: string;
  password: string;
  id: number;
};
export type UserIsValid = (username: string, password: string) => boolean;
export type Request = {
  getUser: () => Promise<User[]>;
  postUser: (user: Omit<User, "id">) => void;
};
export const baseUrl = "http://localhost:3000";

export type HistoryInfoTypes =
  | Omit<breastFeedingInfoType, "id">
  | Omit<bottleFeedingInfoType, "id">
  | Omit<nappingType, "id">
  | Omit<IllnessType, "id">
  | Omit<DaipersHistoryInfoTypes, "id">
  | Omit<ChildInfoT, "id">
  | Omit<ProfileInfoTypes, "id">
  | Omit<infantFeedingInfoType, "id">;
export type ChildInfoT = {
  name: string;

  DOB: string;
  gender: string;
  weight: string;
  height: string;
  headSize: string;

  profileId: string ;
  id: string;
};
export type ProfileInfoTypes = {
  username: string;
  password: string;
  caregiver: string;
  // userEmail: string;
  // cargiverEmail: string;
  id: string;
};

export type breastFeedingInfoType = {
  time: string;
  date: string;
  id: string;
  feedingTimeLength: string;
  childId: string;
};
export type infantFeedingInfoType = {
  time: string;
  date: string;
  id: string;
  drinkType: string;
  foodType: string;
  childId: string;
};
export type bottleFeedingInfoType = {
  time: string;
  date: string;
  id: string;
  bottleOz: string;
  bottleOzLeft: string;
  childId: string;
};


export type IllnessType = {
  id: string;
  date: string;
  time: string;
  
  symptoms: string;
  medicineGiven: string;
  medicineOz: string;
  childId: string;
};

export type DaipersHistoryInfoTypes = {
  time: string;
  date: string;
  consistancy: string;
  diaperType: string;
  id: string;
  childId: string;
};

export type nappingType = {
  id: string;
  date: string;
  time: string;
  lengthOfTime: string;
  childId: string;
};
export type childNapDBType = {
  id: string;
  childId: string;
  nappingId: string;
};

export type bottlefeedingHistoryT = {
  bottleFeedHistory: bottleFeedingInfoType[];
  removeBottleFeedingHistory: (id: string) => void;
};
export type breastfeedingHistoryT = {
  breastFeedHistory: breastFeedingInfoType[];
  removeBreastFeedingHistory: (id: string) => void;
};
export type infantfeedingHistoryT = {
  infantFeedHistory: infantFeedingInfoType[];
  removeInfantFeedingHistory: (id: string) => void;
};
