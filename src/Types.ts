export type User = {
  username: string;
  password: string;
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

export type ProfileInfoTypes = {
  username: string;
  password: string;
  caregiver: string;
  userEmail: string;
  cargiverEmail: string;
  id: number;
};

export type breastFeedingInfoType = {
  time: string;
  date: string;
  id: number;
  feedingTimeLength: string;
};
export type infantFeedingInfoType = {
  time: string;
  date: string;
  id: number;
  drinkType: string;
  foodType: string;
};
export type bottleFeedingInfoType = {
  time: string;
  date: string;
  id: number;
  oz: string;
  ozLeft: string;
};
export type ChildInfoT = {
  name: string;
  age: string;
  weight: string;
  height: string;
  headSize: string;
  // url: string;
  id: number;
};

export type IllnessType = {
  id: number;
  date: string;
  time: string;
  sicknessType: string;
  symptoms: string;
  medicineGiven: string;
  oz: string;
};

export type DaipersHistoryInfoTypes = {
  time: string;
  date: string;
  consistancy: string;
  type: string;
  id: number;
};

export type nappingType = {
  id: number;
  date: string;
  time: string;
  lengthOfTime: string;
};

export type bottlefeedingHistoryT = {
  bottleFeedHistory: bottleFeedingInfoType[];
  removeBottleFeedingHistory: (id: number) => void;
};
export type breastfeedingHistoryT = {
  breastFeedHistory: breastFeedingInfoType[];
  removeBreastFeedingHistory: (id: number) => void;
};
export type infantfeedingHistoryT = {
  infantFeedHistory: infantFeedingInfoType[];
  removeInfantFeedingHistory: (id: number) => void;
};
