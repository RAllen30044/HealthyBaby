import { bottlefeedingHistoryT } from "../../../Types";
import {
  HistoryDateAndTimeColumn,
  HistoryInfoColumn,
  HistoryTableHeader,
} from "../historyTable";

export const BottleFeedingHistory = ({
  bottleFeedHistory,
  removeBottleFeedingHistory,
}: bottlefeedingHistoryT) => {
  return (
    <div className="historyTable">
      {HistoryTableHeader(["Ounces", "Ounces Discarded"], "Feeding")}
      <div className="historyTimelineContainer ">
        {HistoryDateAndTimeColumn(
          bottleFeedHistory,
          "Feeding",
          removeBottleFeedingHistory
        )}
        <div>
          {HistoryInfoColumn(bottleFeedHistory, "bottleOz", "oz", "Feeding")}
        </div>
        <div>
          {HistoryInfoColumn(
            bottleFeedHistory,
            "bottleOzLeft",
            "oz",
            "Feeding"
          )}
        </div>
      </div>
    </div>
  );
};
