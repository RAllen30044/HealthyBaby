import {
  ChildInfoT,
  DiapersHistoryInfoTypes,
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

export const deleteHistoryInfo = (url: string, id: string) =>
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

export const getChildNapHistory = (): Promise<childNapDBType[]> =>
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
