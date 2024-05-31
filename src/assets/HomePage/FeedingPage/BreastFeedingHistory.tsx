import { breastfeedingHistoryT } from "../../../../Types";
import {
  HistoryDeleteIconColumn,
  HistoryInfoColumn,
  HistoryMobileView,
  HistoryTableHeader,
} from "../historyTable";

import "./FeedingPage.css";

export const BreastFeedingHistory = ({
  breastFeedHistory,
  removeBreastFeedingHistory,
}: breastfeedingHistoryT) => {
  return (
    <section className="historyInfoSection">
      <section className="largeScreenHistorySection">
        <div className="historyTable">
          {HistoryTableHeader(
            ["Date", "Time", "Feeding Time", "Delete?"],
            "Feeding"
          )}
          <div className="historyTimelineContainer ">
            {HistoryInfoColumn(breastFeedHistory, "date", "", "Feeding")}

            {HistoryInfoColumn(breastFeedHistory, "time", "", "Feeding")}

            {HistoryInfoColumn(
              breastFeedHistory,
              "feedingTimeLength",
              "min",
              "Feeding"
            )}

            {HistoryDeleteIconColumn(
              breastFeedHistory,
              "Feeding",
              removeBreastFeedingHistory
            )}
          </div>
        </div>
      </section>

      <section className="smallerScreenHistorySection">
        <div className="smallerScreenHistoryTable">
          {HistoryMobileView(
            breastFeedHistory,
            ["feedingTimeLength"],
            ["Feeding Time(min)"],
            ["min"],
            "Feeding",
            removeBreastFeedingHistory
          )}
        </div>
      </section>
    </section>
  );
};
