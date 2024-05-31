import { bottlefeedingHistoryT } from "../../../../Types";
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
          {HistoryTableHeader(["Date","Time","Ounces", "Ounces Discarded","Delete"], "Feeding")}
          <div className="historyTimelineContainer ">
            <div>
              {HistoryInfoColumn(
                bottleFeedHistory,
                "date",
                "",
                "Feeding"
              )}
            </div>
            <div>
              {HistoryInfoColumn(
                bottleFeedHistory,
                "time",
                "",
                "Feeding"
              )}
            </div>
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
            {HistoryDateAndTimeColumn(
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
