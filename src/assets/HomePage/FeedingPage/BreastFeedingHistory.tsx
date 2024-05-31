import { breastfeedingHistoryT } from "../../../../Types";
import {
  HistoryDateAndTimeColumn,
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
            <div>
              {HistoryInfoColumn(breastFeedHistory, "date", "", "Feeding")}
            </div>
            <div>
              {HistoryInfoColumn(breastFeedHistory, "time", "", "Feeding")}
            </div>
            <div>
              {HistoryInfoColumn(
                breastFeedHistory,
                "feedingTimeLength",
                "min",
                "Feeding"
              )}
            </div>
            {HistoryDateAndTimeColumn(
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
