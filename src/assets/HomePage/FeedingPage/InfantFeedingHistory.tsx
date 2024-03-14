import { infantfeedingHistoryT } from "../../../Types";
import {
  HistoryDateAndTimeColumn,
  HistoryInfoColumn,
  HistoryMobileView,
  HistoryTableHeader,
} from "../historyTable";

export const InfantFeedingHistory = ({
  infantFeedHistory,
  removeInfantFeedingHistory,
}: infantfeedingHistoryT) => {
  return (
    <section className="historyInfoSection">
      <section className="largeScreenHistorySection">
        <div className="historyTable">
          {HistoryTableHeader(["Food Served", "Beverage"], "Feeding")}
          <div className="historyTimelineContainer ">
            {HistoryDateAndTimeColumn(
              infantFeedHistory,
              "Feeding",
              removeInfantFeedingHistory
            )}
            <div>
              {HistoryInfoColumn(infantFeedHistory, "foodType", "", "Feeding")}
            </div>
            <div>
              {HistoryInfoColumn(infantFeedHistory, "drinkType", "", "Feeding")}
            </div>
          </div>
        </div>
      </section>
      <section className="smallerScreenHistorySection">
        <div className="smallerScreenHistoryTable">
          {HistoryMobileView(
            infantFeedHistory,
            ["foodType", "drinkType"],
            ["Food Served", "Beverage"],
            ["", ""],
            "Feeding",
            removeInfantFeedingHistory
          )}
        </div>
      </section>
    </section>
  );
};
