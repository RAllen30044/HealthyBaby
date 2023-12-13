import { bottleFeedingInfoType } from "./FeedingApi";

type bottlefeedingHistoryT = {
  bottleFeedHistory: bottleFeedingInfoType[];
  removeBottleFeedingHistory: (id:number)=> void;
};
export const BottleFeedingHistory = ({
  bottleFeedHistory, removeBottleFeedingHistory
}: bottlefeedingHistoryT) => {
  return (
    <>
      {bottleFeedHistory.map((history) => {
        return (
        
            <div className="historyContainer" key={history.id}>
              <div className="bottlefeedingHistory feedingTimeline">
                <h2>Bottle Feeding number {bottleFeedHistory.indexOf(history)+1}</h2>
                <h4>Date: {history.date}</h4>
                <h4>Time: {history.time}</h4>
                <h4>Oz.: {history.oz}</h4>
                <h4>Oz. discarded: {history.ozLeft}</h4>
              </div>
              <button className="Delete button" onClick={()=>{
                removeBottleFeedingHistory(history.id)
              }}>Delete</button>
            </div>
       
        );
      })}
    </>
  );
};
