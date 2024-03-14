import { breastfeedingHistoryT } from "../../../Types";
import { HistoryDateAndTimeColumn, HistoryInfoColumn, HistoryTableHeader } from "../historyTable";

import "./FeedingPage.css";

export const BreastFeedingHistory = ({
  breastFeedHistory,
  removeBreastFeedingHistory,
}: breastfeedingHistoryT) => {
  return (
    <div className="historyTable">
      {HistoryTableHeader(["Feeding Time"], "Feeding")}
      <div className="historyTimelineContainer ">
        {HistoryDateAndTimeColumn(
          breastFeedHistory,
          "Feeding",
          removeBreastFeedingHistory
        )}
        <div>
          {HistoryInfoColumn(
         breastFeedHistory,
            "feedingTimeLength",
            "min",
            "Feeding"
          )}
        </div>
      </div>
    </div>
  );
};
