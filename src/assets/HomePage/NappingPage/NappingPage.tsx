import { ChildInfo } from "../ChildInfo/ChildInfo";
import { TimeInfo, useTimeInfo } from "../TimeInfo/TimeInfo";
import {
  deleteNappingHistory,
  getNappingHistory,
  nappingType,
  postNappingHistory,
} from "./NappingApi";
import { useEffect, useState } from "react";
import "./NappingPage.css";

export const NappingPage = () => {
  const [nappingHistory, setNappingHistory] = useState<nappingType[]>([]);
  const [LengthOfTime, setLengthOfTime] = useState("");
  const { time, setTime, date, setDate, loading, setLoading } = useTimeInfo();

  const fetchNappingHistory = () => getNappingHistory().then(setNappingHistory);

  useEffect(() => {
    fetchNappingHistory().catch((err) => console.log(err));
  }, []);

  const removeIllnessHistory = (id: number) => {
    const updateData = nappingHistory.filter((history) => history.id !== id);
    setNappingHistory(updateData);

    deleteNappingHistory(id).then((res) => {
      if (!res.ok) {
        setNappingHistory(nappingHistory);
      } else return;
    });
  };

  return (
    <>
      <div className="banner nappingBanner">
        <ChildInfo />
        <div className="category">
          <div className="categoryName">
            <h1>Napping</h1>
          </div>
        </div>
      </div>
      <div className="dataInputForm">
        <form
          action="POST"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            postNappingHistory({
              time: time,
              date: date,
              lengthOfTime: LengthOfTime,
            })
              .then(fetchNappingHistory)
              .then(() => {
                setTime("");
                setDate("");
                setLengthOfTime("");
              })
              .then(() => {
                setLoading(false);
              });
          }}
        >
          <TimeInfo />
          <div className="napLength ">
            <label htmlFor="napLength">Nap Length:</label>
            <input
              type="text"
              name="napLength"
              id="napLength"
              value={LengthOfTime}
              onChange={(e) => {
                setLengthOfTime(e.target.value);
              }}
            />
          </div>

          <div className="saveContainer">
            <button
              type="submit"
              className="save nappingSave"
              disabled={loading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="historyHeaderContainer">
        <div className="categoryName historyHeader">
          <h1>Napping History</h1>
        </div>
      </div>
      <div className="historyTimelineContainer">
        {nappingHistory.map((history) => {
          return (
            <div className="historyContainer" key={history.id}>
              <div className="diapersHistory">
                <h2>
                  Illness Record Number {nappingHistory.indexOf(history) + 1}
                </h2>
                <h3>Time: {history.time}</h3>
                <h3>Date: {history.date}</h3>
                <h3>Length of Time: {history.lengthOfTime}</h3>
              </div>
              <button
                className="Delete button"
                onClick={() => {
                  removeIllnessHistory(history.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
