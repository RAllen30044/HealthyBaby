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
                "bottleQuantity",
                "",
                "Feeding"
              )}
            </div>
            <div>
              {HistoryInfoColumn(
                bottleFeedHistory,
                "bottleQuantityLeft",
                "",
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
