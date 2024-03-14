import { infantfeedingHistoryT } from "../../../Types";
import { HistoryDateAndTimeColumn, HistoryInfoColumn, HistoryTableHeader } from "../historyTable";

export const InfantFeedingHistory = ({
  infantFeedHistory,
  removeInfantFeedingHistory,
}: infantfeedingHistoryT) => {
  return (
    <div className="historyTable">
      {HistoryTableHeader(["Food Served", "Beverage"],"Feeding")}
      <div className="historyTimelineContainer ">
        {HistoryDateAndTimeColumn(
          infantFeedHistory,
          "Feeding",
          removeInfantFeedingHistory
        )}
        <div>
          {HistoryInfoColumn( infantFeedHistory, "foodType", "", "Feeding")}
        </div>
        <div>
          {HistoryInfoColumn( infantFeedHistory, "drinkType", "", "Feeding")}
        </div>
      </div>
    </div>
  );
};
