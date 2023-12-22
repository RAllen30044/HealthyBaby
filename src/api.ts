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
  nappingType,
} from "./Types";

const url = "http://localhost:3000/user";

export const childUrl = `${baseUrl}/child`;
export const breastFeedingHistoryUrl = `${baseUrl}/breastFeedingHistory`;
export const bottleFeedingHistoryUrl = `${baseUrl}/bottleFeedingHistory`;
export const diaperUrl = `${baseUrl}/diapersHistory`;
export const illnessUrl = `${baseUrl}/illness`;
export const nappingUrl = `${baseUrl}/napHistory`;
export const profileUrl = `${baseUrl}/profile`;

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
