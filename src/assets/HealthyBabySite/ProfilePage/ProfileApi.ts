import { baseUrl } from "../../../Types";

const profileUrl = `${baseUrl}/profile`;
export type ProfileInfoTypes = {
  username: string;
  password: string;
  caregiver: string;
  userEmail: string;
  cargiverEmail: string;
  id: number;
};

export const getProfileData = () =>
  fetch(profileUrl)
    .then((res) => res.json())
    .then((data) => data);

export const updateProfileData = (profileInfo: ProfileInfoTypes, id: number) =>
  fetch(`${profileUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(profileInfo),
  });
export const postProfileData = (profileInfo: Omit<ProfileInfoTypes, "id">) =>
  fetch(profileUrl, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(profileInfo),
  });

export const deleteProfile = (id: number) =>
  fetch(`${profileUrl}/${id}`, {
    method: "DELETE",
  });
