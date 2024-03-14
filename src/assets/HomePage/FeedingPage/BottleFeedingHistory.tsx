import { bottlefeedingHistoryT } from "../../../Types";
import {
  HistoryDateAndTimeColumn,
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
          {HistoryTableHeader(["Ounces", "Ounces Discarded"], "Feeding")}
          <div className="historyTimelineContainer ">
            {HistoryDateAndTimeColumn(
              bottleFeedHistory,
              "Feeding",
              removeBottleFeedingHistory
            )}
            <div>
              {HistoryInfoColumn(
                bottleFeedHistory,
                "bottleOz",
                "oz",
                "Feeding"
              )}
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
      </section>
      <section className="smallerScreenHistorySection">
        <div className="smallerScreenHistoryTable">
          {HistoryMobileView(
            bottleFeedHistory,
            ["bottleOz", "bottleOzLeft"],
            ["Ounces", "Ounces Discarded"],
            ["oz", "oz"],
            "Feeding",
            removeBottleFeedingHistory
          )}
        </div>
      </section>
    </section>
  );
};
