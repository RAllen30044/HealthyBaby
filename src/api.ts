import {
  ChildInfoT,
  DaipersHistoryInfoTypes,
  HistoryInfoTypes,
  IllnessType,
  ProfileInfoTypes,
  User,
  baseUrl,
  bottleFeedingInfoType,
  breastFeedingInfoType,
  childNapDBType,
  infantFeedingInfoType,
  nappingType,
} from "./Types";
import { convertAgeToAppropriateAgeType } from "./assets/HomePage/TimeInfo/TimeConversion";

const url = "http://localhost:3000/user";

export const childUrl = `${baseUrl}/child`;
export const breastFeedingHistoryUrl = `${baseUrl}/breastFeedingHistory`;
export const bottleFeedingHistoryUrl = `${baseUrl}/bottleFeedingHistory`;
export const infantFeedingHistoryUrl = `${baseUrl}/infantFeedingHistory`;
export const diaperUrl = `${baseUrl}/diapersHistory`;
export const illnessUrl = `${baseUrl}/illness`;
export const nappingUrl = `${baseUrl}/napHistory`;
export const profileUrl = `${baseUrl}/profile`;
export const childNapDBUrl = `${baseUrl}/childNapDB`;

const getUser = (): Promise<User[]> =>
  fetch(url)
    .then((response) => response.json())
    .then((data: User[]) => data);

const postUser = (user: string, password: string) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ user: user, password: password }),
  });

export const Request = {
  getUser,
  postUser,
};

export const postInfo = (object: HistoryInfoTypes, url: string) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(object),
  });

export const deleteHistoryInfo = (url: string, id: number) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
  });

export const getChildInfo = (): Promise<ChildInfoT[]> =>
  fetch(childUrl)
    .then((res) => res.json())
    .then((data) => data);

export const getBreastFeedingHistoryInfo = (): Promise<
  breastFeedingInfoType[]
> =>
  fetch(breastFeedingHistoryUrl)
    .then((res) => res.json())
    .then((data) => data);
export const getInfantFeedingHistoryInfo = (): Promise<
  infantFeedingInfoType[]
> =>
  fetch(infantFeedingHistoryUrl)
    .then((res) => res.json())
    .then((data) => data);

export const getBottleFeedingHistoryInfo = (): Promise<
  bottleFeedingInfoType[]
> =>
  fetch(bottleFeedingHistoryUrl)
    .then((res) => res.json())
    .then((data) => data);

export const getIllnessHistory = (): Promise<IllnessType[]> =>
  fetch(illnessUrl)
    .then((res) => res.json())
    .then((data) => data);

export const getDaipersHistory = (): Promise<DaipersHistoryInfoTypes[]> =>
  fetch(diaperUrl)
    .then((res) => res.json())
    .then((data) => data);

export const getNappingHistory = (): Promise<nappingType[]> =>
  fetch(nappingUrl)
    .then((res) => res.json())
    .then((data) => data);

export const getProfileData = (): Promise<ProfileInfoTypes[]> =>
  fetch(profileUrl)
    .then((res) => res.json())
    .then((data) => data);

export const getChildNapHistory = (): Promise<childNapDBType[]> =>
  fetch(childNapDBUrl).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to get napping history");
    }
    return res.json();
  });

export const updateChildDateAge = (DOB: string, id: number) => {
  fetch(`${childUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      age: convertAgeToAppropriateAgeType(DOB),
    }),
  });
};
// export const updateChildInfo = (DOB: string, id: number) => {
//   fetch(`${childUrl}/${id}`, {
//     method: "PATCH",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify({
//       age: convertAgeToAppropriateAgeType(DOB),
//     }),
//   });
// };
// export const updateProfileInfo = (DOB: string, id: number) => {
//   fetch(`${childUrl}/${id}`, {
//     method: "PATCH",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify({
//       age: convertAgeToAppropriateAgeType(DOB),
//     }),
//   });
// };
