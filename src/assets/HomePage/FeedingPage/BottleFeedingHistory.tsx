import { bottlefeedingHistoryT } from "../../../../Types";
import {
  HistoryDeleteIconColumn,
  HistoryInfoColumn,
  HistoryMobileView,
  HistoryTableHeader,
} from "../historyTable";

export const BottleFeedingHistory = ({
  bottleFeedHistory,
  removeBottleFeedingHistory,
}: bottlefeedingHistoryT) => {
  return (
    <section className="historyInfoSection">
      <section className="largeScreenHistorySection">
        <div className="historyTable">
          {HistoryTableHeader(
            ["Date", "Time", "Ounces", "Ounces Discarded", "Delete?"],
            "Feeding"
          )}
          <div className="historyTimelineContainer ">
            {HistoryInfoColumn(bottleFeedHistory, "date", "", "Feeding")}

            {HistoryInfoColumn(bottleFeedHistory, "time", "", "Feeding")}

            {HistoryInfoColumn(
              bottleFeedHistory,
              "bottleQuantity",
              "",
              "Feeding"
            )}

            {HistoryInfoColumn(
              bottleFeedHistory,
              "bottleQuantityLeft",
              "",
              "Feeding"
            )}

            {HistoryDeleteIconColumn(
              bottleFeedHistory,
              "Feeding",
              removeBottleFeedingHistory
            )}
          </div>
        </div>
      </section>
      <section className="smallerScreenHistorySection">
        <div className="smallerScreenHistoryTable">
          {HistoryMobileView(
            bottleFeedHistory,
            ["bottleQuantity", "bottleQuantityLeft"],
            ["Ounces", "Ounces Discarded"],
            ["", ""],
            "Feeding",
            removeBottleFeedingHistory
          )}
        </div>
      </section>
    </section>
  );
};
