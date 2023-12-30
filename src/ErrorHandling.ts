export const preventKeyingNumbers = (value: string) => {
  return value.replace(/[^A-Za-z\s]/, "");
};
export const onlyKeyNumbers = (value: string) => {
  return value.replace(/[0-9]/, "");
};

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isLastNameValid(lastName: string) {
  return lastName.length > 1;
}
export function isFirstNameValid(firstName: string) {
  return firstName.length > 1;
}

export function DOBnotVaild(DOB: string) {
  return new Date() < new Date(DOB);
}
export function timeInvaild(date: string, time: string) {
  return new Date() < new Date(`${date}T${time}`);
}

export const futureTimeNotAllowed =
  "Cannot chose a future time, Please select a different time and/or date";
