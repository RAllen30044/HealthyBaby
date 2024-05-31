import { eatingHistoryT } from "../../../../Types";
import {
  HistoryDeleteIconColumn,
  HistoryInfoColumn,
  HistoryMobileView,
  HistoryTableHeader,
} from "../historyTable";

export const EatingHistory = ({
  eatingHistory,
  removeEatingHistory,
}: eatingHistoryT) => {
  return (
    <section className="historyInfoSection">
      <section className="largeScreenHistorySection">
        <div className="historyTable">
          {HistoryTableHeader(
            ["Date", "Time", "Food Served", "Beverage", "Delete?"],
            "Feeding"
          )}
          <div className="historyTimelineContainer ">
            {/* {HistoryDateAndTimeColumn(
              eatingHistory,
              "Feeding",
              removeEatingHistory
            )} */}
            {HistoryInfoColumn(eatingHistory, "date", "", "Feeding")}
            {HistoryInfoColumn(eatingHistory, "time", "", "Feeding")}

            {HistoryInfoColumn(eatingHistory, "foodType", "", "Feeding")}

            {HistoryInfoColumn(eatingHistory, "drinkType", "", "Feeding")}

            {HistoryDeleteIconColumn(
              eatingHistory,
              "Feeding",
              removeEatingHistory
            )}
          </div>
        </div>
      </section>
      <section className="smallerScreenHistorySection">
        <div className="smallerScreenHistoryTable">
          {HistoryMobileView(
            eatingHistory,
            ["foodType", "drinkType"],
            ["Food Served", "Beverage"],
            ["", ""],
            "Feeding",
            removeEatingHistory
          )}
        </div>
      </section>
    </section>
  );
};
