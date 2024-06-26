// import { ChildInfoT, ProfileInfoTypes } from "../Types";

import { ChildInfoT } from "../Types";
import { UseHistoryIDComponent } from "./HistoryProvider";

export const preventKeyingNumbers = (value: string) => {
  return value.replace(/[^A-Za-z\s]/, "");
};
export const preventKeyingSpaces = (value: string) => {
  return value.replace(/[\s]/, "");
};
export const onlyKeyNumbers = (value: string) => {
  return value.replace(/[^0-9]/, "");
};
export const onlyNumbersWithDecimal = (value: string) => {
  return value.replace(/[^0-9.]/g, "");
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

export function isDOBValid(DOB: string) {
  return new Date() < new Date(DOB);
}

export function timeInvalid(date: string, time: string) {
  return new Date() < new Date(`${date}T${time}`);
}

export const futureTimeNotAllowed =
  "Cannot chose a future time, Please select a different time and/or date";
export const futureDOBNotAllowed =
  "Cannot chose a future time, Please select a different date";

// export const firstAvailableChild = (
//   child: ChildInfoT[],
//   user: ProfileInfoTypes | undefined
// ) => {
//   return child.find((child) => child.profileId === user?.id);
// };

export const setActiveHomePageComponentInLocalStorage = (component: string) => {
  return localStorage.setItem(
    "activeHomePageComponent",
    JSON.stringify({
      activeHomePageComponent: component,
    })
  );
};
export const setActiveMainComponentInLocalStorage = (component: string) => {
  return localStorage.setItem(
    "activeMainComponent",
    JSON.stringify({
      activeMainComponent: component,
    })
  );
};

export const babyNameForHistory = () => {
  const { profileChildren, childId } = UseHistoryIDComponent();
  const child = profileChildren.find((child) => child.id === childId);
  return `${`${child?.name}` || ""}`;
};

export const getChildDOB = (profileChildren: ChildInfoT[], childId: number) => {
  const child = profileChildren.find((child) => child.id === childId);
  return `${`${child?.DOB}` || ""}`;
};

export const isDateNotBeforeBirth = (DOB: string, currentDate: string) => {
  return currentDate < DOB;
};

export const getIsSubmittedFromLocalStorage = (): boolean => {
  const isSubmitted = localStorage.getItem("isSubmitted");

  if (isSubmitted === "true") {
    console.log(isSubmitted);

    return true;
  }
  return false;
};

export const setIsSubmittedInLocalStorage = (isSubmitted: string) => {
  return localStorage.setItem("isSubmitted", isSubmitted);
};

export const numberErrorMessage = "Must enter a number.";

export const isEntryNotANumber = (num: string): boolean => {
  if (isNaN(Number.parseFloat(num))) {
    return true;
  }
  return false;
};

export const noWordErrorMessage = (category: string): string => {
  return `Must enter ${category}`;
};
export const isWordsEntered = (message: string): boolean => {
  if (message.length > 1) {
    return false;
  }
  return true;
};
