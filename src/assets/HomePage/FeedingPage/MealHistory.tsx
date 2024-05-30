import { eatingHistoryT } from "../../../../Types";
import {
  HistoryDateAndTimeColumn,
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
            <div>{HistoryInfoColumn(eatingHistory, "date", "", "Feeding")}</div>
            <div>{HistoryInfoColumn(eatingHistory, "time", "", "Feeding")}</div>
            <div>
              {HistoryInfoColumn(eatingHistory, "foodType", "", "Feeding")}
            </div>
            <div>
              {HistoryInfoColumn(eatingHistory, "drinkType", "", "Feeding")}
            </div>          {HistoryDateAndTimeColumn(
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
