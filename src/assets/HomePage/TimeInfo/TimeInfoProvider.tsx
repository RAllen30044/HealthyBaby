import { ReactNode, createContext, useContext, useState } from "react";
import {
  isDOBValid,
  isDateBeforeBirth,
  timeInvalid,
} from "../../../ErrorHandling";
import { useAuthProviderContext } from "../../HealthyBabySite/LandingPage/authProvider";

export type TimeInfoProviderT = {
  time: string;
  date: string;
  loading: boolean;
  shouldShowDOBentryError: boolean;
  shouldShowDateTimeEntryError: boolean;
  shouldShowDateBeforeBirthError: boolean | "" | null;
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
  const shouldShowDOBentryError = isSubmitted && isDOBValid(date);
  const shouldShowDateTimeEntryError = isSubmitted && timeInvalid(date, time);

  const shouldShowDateBeforeBirthError =
    isSubmitted &&
    maybeChild &&
    isDateBeforeBirth(JSON.parse(maybeChild).DOB, date);

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
