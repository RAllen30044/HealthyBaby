import { ReactNode, createContext, useContext, useState } from "react";
import {
  DOBnotVaild,
  isDateBeforeBirth,
  timeInvaild,
} from "../../../ErrorHandling";
import { useAuthProviderContext } from "../../HealthyBabySite/LandingPage/authProvider";
import { faker } from "@faker-js/faker";
import {
  convertAgeToAppropriateAgeType,
  convertToStandardTime,
  createShortHandDate,
  formatDate,
  setRandomTime,
} from "./TimeConversion";

export type TimeInfoProviderT = {
  time: string;
  date: string;
  loading: boolean;
  shouldShowDOBentryError: boolean;
  shouldShowDateTimeEntryError: boolean;
  shouldShowDateBeforeBirthError: boolean;
  isSubmitted: boolean;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};
const TimeInfoContext = createContext<TimeInfoProviderT>(
  {} as TimeInfoProviderT
);

export const TimeInfoProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { maybeChild } = useAuthProviderContext();
  const shouldShowDOBentryError = isSubmitted && DOBnotVaild(date);
  const shouldShowDateTimeEntryError = isSubmitted && timeInvaild(date, time);
  const shouldShowDateBeforeBirthError =
    isSubmitted &&
    isDateBeforeBirth(JSON.parse(maybeChild || "Error finding DOB").DOB, date);

  const randomizeDate = () => {
    const getRandomDate = faker.date.recent({ days: 10 });
    console.log(getRandomDate);
    if (getRandomDate.getMonth() + 1 < 10 && getRandomDate.getDate() < 10) {
      return `${getRandomDate.getFullYear()}-0${
        getRandomDate.getMonth() + 1
      }-0${getRandomDate.getDate()}`;
    } else if (getRandomDate.getDate() < 10) {
      return `${getRandomDate.getFullYear()}-${
        getRandomDate.getMonth() + 1
      }-0${getRandomDate.getDate()}`;
    } else if (getRandomDate.getMonth() < 10) {
      return `${getRandomDate.getFullYear()}-0${
        getRandomDate.getMonth() + 1
      }-${getRandomDate.getDate()}`;
    } else {
      return `${getRandomDate.getFullYear()}-${
        getRandomDate.getMonth() + 1
      }-${getRandomDate.getDate()}`;
    }
  };

  console.log(Math.floor(Math.random() * 6 + 4));

  console.log(formatDate(createShortHandDate(randomizeDate())));

  console.log(
    convertAgeToAppropriateAgeType(
      `${faker.date.birthdate({ min: 0, max: 6, mode: "age" })}`
    )
  );

  console.log(convertToStandardTime(setRandomTime()));

  return (
    <TimeInfoContext.Provider
      value={{
        time,
        setTime,
        date,
        setDate,
        loading,
        setLoading,
        shouldShowDOBentryError,
        setIsSubmitted,
        shouldShowDateTimeEntryError,
        isSubmitted,
        shouldShowDateBeforeBirthError,
      }}
    >
      {children}
    </TimeInfoContext.Provider>
  );
};

export const dateBeforeBirthMessage =
  "Can not choose a date the is before the birth of the child";
// eslint-disable-next-line react-refresh/only-export-components
export const useTimeInfo = () => useContext(TimeInfoContext);

export const TimeInfo = () => {
  const { time, date, setTime, setDate } = useTimeInfo();

  return (
    <>
      <div className="time">
        <label htmlFor="time">Time: </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(`${e.target.value}`)}
          required
        />
      </div>
      <div className="date">
        <label htmlFor="date">Date: </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          required
        />
      </div>
    </>
  );
};
