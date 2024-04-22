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
