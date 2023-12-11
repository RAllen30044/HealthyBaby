import { bottleFeedingInfoType } from "./FeedingApi";

type bottlefeedingHistoryT = {
  bottleFeedHistory: bottleFeedingInfoType[];
};
export const BottleFeedingHistory = ({
  bottleFeedHistory,
}: bottlefeedingHistoryT) => {
  return (
    <>
      {bottleFeedHistory.map((history) => {
        return (
          <>
            <div className="bottlefeedingHistory feedingTimeline" key={history.id}>
              <h2>Bottle Feeding number {history.id + 1}</h2>
              <h4>Date: {history.date}</h4>
              <h4>Time: {history.time}</h4>
              <h4>Oz.: {history.oz}</h4>
              <h4>Oz. discarded: {history.ozLeft}</h4>
            </div>
          </>
        );
      })}
    </>
  );
};
