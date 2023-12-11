export type User = {
  username: string;
  password: string;
};
export type UserIsValid = (username: string, password: string) => boolean;
export type Request = {
  getUser: () => Promise<User[]>;
  postUser: (user: Omit<User, "id">) => void;
};
 export const baseUrl="http://localhost:3000";