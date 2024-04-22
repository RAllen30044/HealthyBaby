import {
  ChildInfoT,
  DiapersHistoryInfoTypes,
  HistoryInfoTypes,
  IllnessType,
  ProfileInfoTypes,
  bottleFeedingInfoType,
  breastFeedingInfoType,
  eatingInfoType,
  nappingType,
} from "./Types";

export const baseUrl = "http://localhost:3000";

export const childUrl = `${baseUrl}/child`;
export const breastFeedingHistoryUrl = `${baseUrl}/breastFeedingHistory`;
export const bottleFeedingHistoryUrl = `${baseUrl}/bottleFeedingHistory`;
export const mealHistoryUrl = `${baseUrl}/mealHistory`;
export const diaperUrl = `${baseUrl}/diapersHistory`;
export const illnessUrl = `${baseUrl}/illnessHistory`;
export const nappingUrl = `${baseUrl}/napHistory`;
export const profileUrl = `${baseUrl}/profile`;
export const childNapDBUrl = `${baseUrl}/childNapDB`;

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
export const getMealHistoryInfo = (): Promise<eatingInfoType[]> =>
  fetch(mealHistoryUrl)
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

export const getDiapersHistory = (): Promise<DiapersHistoryInfoTypes[]> =>
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

export const getChildNapHistory = (): Promise<nappingType[]> =>
  fetch(childNapDBUrl).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to get napping history");
    }
    return res.json();
  });

export const updateChildInfo = (
  name: string,
  DOB: string,
  gender: string,
  height: string,
  weight: string,
  headSize: string,
  id: string
) => {
  return fetch(`${childUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name: name,
      DOB: DOB,
      gender: gender,
      height: height,
      weight: weight,
      headSize: headSize,
    }),
  });
};
export const updateProfileInfo = (
  caregiver: string,
  password: string,
  id: number
) => {
  return fetch(`${profileUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      caregiver: caregiver,
      password: password,
    }),
  });
};
