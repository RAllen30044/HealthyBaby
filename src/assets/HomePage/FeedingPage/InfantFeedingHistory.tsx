import { useHistoryIDComponent } from "../../../HistoryProvider";
import { infantfeedingHistoryT } from "../../../Types";

export const InfantFeedingHistory = ({
  infantFeedHistory,
  removeInfantFeedingHistory,
}: infantfeedingHistoryT) => {
  const { childId } = useHistoryIDComponent();
  return (
    <>
      {infantFeedHistory
        .filter((history) => history.childId === childId)
        .sort((b, a) => {
          if (new Date(a.date) < new Date(b.date)) {
            return -1;
          }
          if (new Date(a.date) > new Date(b.date)) {
            return 1;
          }

          return 0;
        })
        .map((history) => {
          return (
            <div className="historyContainer" key={history.id}>
              <div className="breasfeedingHistory">
                <h4>Date: {history.date}</h4>
                <h4>Time: {history.time}</h4>
                <h4>
                  Drink:
                  {history.drinkType}
                </h4>
                <h4>
                  Food:
                  {history.foodType}
                </h4>
              </div>
              <button
                className="Delete button"
                onClick={() => {
                  removeInfantFeedingHistory(history.id);
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
