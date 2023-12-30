import { infantfeedingHistoryT } from "../../../Types";

export const InfantFeedingHistory = ({
  infantFeedHistory,
  removeInfantFeedingHistory,
}: infantfeedingHistoryT) => {
  return (
    <>
      {infantFeedHistory.map((history) => {
        return (
          <div className="historyContainer" key={history.id}>
            <div className="breasfeedingHistory">
              <h2>Child Fed number {infantFeedHistory.indexOf(history) + 1}</h2>
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
