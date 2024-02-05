import { useHistoryIDComponent } from "../../../HistoryProvider";
import { bottlefeedingHistoryT } from "../../../Types";

export const BottleFeedingHistory = ({
  bottleFeedHistory,
  removeBottleFeedingHistory,
}: bottlefeedingHistoryT) => {
  const { childId } = useHistoryIDComponent();
  return (
    <>
      {bottleFeedHistory
        .filter((history) => history.childId === childId)
        .sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }

          return 0;
        })
        .map((history) => {
          return (
            <div className="historyContainer" key={history.id}>
              <div className="bottlefeedingHistory feedingTimeline">

                <h4>Date: {history.date}</h4>
                <h4>Time: {history.time}</h4>
                <h4>Oz.: {history.oz}</h4>
                <h4>Oz. discarded: {history.ozLeft}</h4>
              </div>
              <button
                className="Delete button"
                onClick={() => {
                  removeBottleFeedingHistory(history.id);
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
