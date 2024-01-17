import { useHistoryIDComponent } from "../../../HistoryProvider";
import { breastfeedingHistoryT } from "../../../Types";

export const BreastFeedingHistory = ({
  breastFeedHistory,
  removeBreastFeedingHistory,
}: breastfeedingHistoryT) => {
  const {childId}= useHistoryIDComponent();
  return (
    <>
      {breastFeedHistory.filter((history) => history.childId === childId)
          .sort((a, b) => {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }

            return 0;
          }).map((history) => {
        return (
          <div className="historyContainer" key={history.id}>
            <div className="breasfeedingHistory">
              <h2>
                Breast Feeding number {breastFeedHistory.indexOf(history) + 1}
              </h2>
              <h4>Date: {history.date}</h4>
              <h4>Time: {history.time}</h4>
              <h4>
                Feeding Time in minutes and seconds:
                {history.feedingTimeLength}
              </h4>
            </div>
            <button
              className="Delete button"
              onClick={() => {
                removeBreastFeedingHistory(history.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};
