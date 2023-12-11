import { ReactNode, createContext, useContext, useState } from "react";

export type TimeInfoProviderT = {
  time: string;
  date: string;
  loading: boolean;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const TimeInfoContext = createContext<TimeInfoProviderT>(
  {} as TimeInfoProviderT
);

export const TimeInfoProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <TimeInfoContext.Provider
      value={{ time, setTime, date, setDate, loading, setLoading }}
    >
      {children}
    </TimeInfoContext.Provider>
  );
};

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
        />
      </div>
    </>
  );
};
