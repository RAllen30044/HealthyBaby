import {
  ChildInfoT,
  DiapersHistoryInfoTypes,
  HistoryInfoTypes,
  IllnessType,
  ProfileEmailTypes,
  ProfileInfoTypes,
  ProfileUsernameTypes,
  bottleFeedingInfoType,
  breastFeedingInfoType,
  eatingInfoType,
  nappingType,
} from "./Types";

export type tokenInfoType = {
  token: string;
  userInformation: {
    usernames: string;
  };
};
export type authorizationType = {
  authorization: (username: string, password: string) => tokenInfoType;
};

export const baseUrl = "http://localhost:3000";
export const firstChildUrl = `${baseUrl}/firstChild`;
export const currentChildUrl = `${baseUrl}/currentChild`;
export const breastFeedingHistoryUrl = `${baseUrl}/breastFeedingHistory`;
export const bottleFeedingHistoryUrl = `${baseUrl}/bottleFeedingHistory`;
export const mealHistoryUrl = `${baseUrl}/mealHistory`;
export const diaperUrl = `${baseUrl}/diapersHistory`;
export const illnessUrl = `${baseUrl}/illnessHistory`;
export const nappingUrl = `${baseUrl}/napHistory`;
export const profileUrl = `${baseUrl}/profile`;
export const profilesUrl = `${baseUrl}/profiles`;
export const usernamesUrl = `${baseUrl}/allProfileUsernames`;
export const emailsUrl = `${baseUrl}/allProfileEmails`;

export const childrenUrl = `${baseUrl}/children`;

export const authorization = (
  username: string,
  password: string
): Promise<tokenInfoType> =>
  fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err.message);
    });
export const getProfilesChildren = (
  token: string | null
): Promise<ChildInfoT[]> =>
  fetch(`${childrenUrl}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => data);
export const getProfilesFirstChild = (
  token: string | null
): Promise<ChildInfoT> =>
  fetch(`${firstChildUrl}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => data);
export const getProfile = async (
  token: string | null
): Promise<ProfileInfoTypes> => {
  if (!token) {
    return Promise.reject(new Error("Token is required"));
  }

  const profile = await fetch(`${profileUrl}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to get profile");
      }

      return res.json();
    })
    .then((data) => data);
  return profile;
};
export const updateChildInfo = async (
  child: object,
  id: number,
  token: string | null
): Promise<Response> => {
  try {
    const response = await fetch(`${childrenUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(child),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Failed to update child info:", error);

    throw error;
  }
};

export const updateProfileInfo = (
  caregiver: string,
  password: string,

  token: string
) => {
  return fetch(`${profileUrl}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      caregiver: caregiver,
      password: password,
    }),
  });
};
export const postInfo = (object: HistoryInfoTypes, url: string) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(object),
  });
export const postProfile = (object: HistoryInfoTypes) =>
  fetch(profilesUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(object),
  });

export const deleteHistoryInfo = (url: string, id: number) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
  });

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

export const getAllProfileUserNames = (): Promise<ProfileUsernameTypes[]> =>
  fetch(usernamesUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to get Usernames");
      }
      return res.json();
    })
    .then((data) => data);
export const getAllProfileEmails = (): Promise<ProfileEmailTypes[]> =>
  fetch(emailsUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to get Emails");
      }
      return res.json();
    })
    .then((data) => data);

export const getCurrentProfile = (token: string | null) =>
  fetch(`${profileUrl}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to get current child");
    }
    return res.json();
  });
export const updateCurrentProfile = (
  object: Partial<ProfileInfoTypes>,
  token: string | null
) =>
  fetch(`${profileUrl}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(object),
  });
