import { breastFeedingInfoType } from "./FeedingApi";

type breastfeedingHistoryT = {
  breastFeedHistory: breastFeedingInfoType[];
};
export const BreastFeedingHistory = ({
  breastFeedHistory,
}: breastfeedingHistoryT) => {
  return (
    <>
      {breastFeedHistory.map((history) => {
        return (
          <>
            <div className="breasfeedingHistory" key={history.id}>
              <h2>Breast Feeding number {history.id + 1}</h2>
              <h4>Date: {history.date}</h4>
              <h4>Time: {history.time}</h4>
              <h4>
                Feeding Time in minutes and seconds: {history.feedingTimeLength}
              </h4>
            </div>
          </>
        );
      })}
    </>
  );
};
