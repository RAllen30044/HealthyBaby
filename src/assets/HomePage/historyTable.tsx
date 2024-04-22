import { useHistoryIDComponent } from "../../HistoryProvider";
import {
  DiapersHistoryInfoTypes,
  IllnessType,
  bottleFeedingInfoType,
  breastFeedingInfoType,
  eatingInfoType,
  nappingType,
} from "../../../Types";

import { ReactElement } from "react";
import { combineDateAndTime } from "./TimeInfo/TimeConversion";

type historyDataType =
  | breastFeedingInfoType
  | bottleFeedingInfoType
  | eatingInfoType
  | nappingType
  | IllnessType
  | DiapersHistoryInfoTypes;

type UnionKeys<T> = T extends T ? keyof T : never;

type CommonKeys<T> = UnionKeys<T> extends infer U
  ? U extends UnionKeys<T>
    ? U
    : never
  : never;

export type HistoryInfoTypeData = {
  time: string;
  date: string;
  id: number;
  feedingTimeLength: string;
  childId: number;

  drinkType: string;
  foodType: string;

  dosage: string;
  bottleQuantity: string;
  bottleQuantityLeft: string;

  symptoms: string;
  medicationType: string;

  consistency: string;
  diaperType: string;

  lengthOfTime: string;
};

const historyInfoSortDirection = (
  date1: historyDataType,
  date2: historyDataType,
  sortDirection: string
) => {
  if (sortDirection === "asc") {
    if (
      new Date(combineDateAndTime(date1.date, date1.time)) <
      new Date(combineDateAndTime(date2.date, date2.time))
    ) {
      return -1;
    }
    if (
      new Date(combineDateAndTime(date1.date, date1.time)) >
      new Date(combineDateAndTime(date2.date, date2.time))
    ) {
      return 1;
    }

    return 0;
  }
  if (sortDirection === "desc") {
    if (
      new Date(combineDateAndTime(date2.date, date2.time)) <
      new Date(combineDateAndTime(date1.date, date1.time))
    ) {
      return -1;
    }
    if (
      new Date(combineDateAndTime(date2.date, date2.time)) >
      new Date(combineDateAndTime(date1.date, date1.time))
    ) {
      return 1;
    }

    return 0;
  }
  return 0;
};

export const HistoryTableHeader = (
  headerValue: string[],
  pageName: string
): ReactElement => {
  const { setSortDirection, sortDirection } = useHistoryIDComponent();

  return (
    <div className="historyTableContainer">
      <div className="sortingContainer">
        <div className="historySortingContainer">
          <label htmlFor="historySortingButtonsContainer">
            <h3>Date Order:</h3>
          </label>
          <div className="historySortingButtonsContainer">
            <button
              type="button"
              onClick={() => {
                setSortDirection("desc");
                localStorage.setItem("sortDirection", "desc");
              }}
              className={`latestButton ${
                sortDirection === "desc" ? "pressedButton" : ""
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => {
                setSortDirection("asc");
                localStorage.setItem("sortDirection", "asc");
              }}
              className={`oldestButton ${
                sortDirection === "desc" ? "" : "pressedButton"
              }`}
            >
              Earliest
            </button>
          </div>
        </div>
      </div>
      <div className="historyTableHeader" key={`${pageName}Header`}>
        <div className={`historyColumnContainer ${pageName}ColumnContainer`}>
          <h3 className="dateTime dateTimeHeader">Date/Time</h3>
        </div>
        {headerValue.map((header, index) => {
          return (
            <div
              key={`${pageName}${index}`}
              className={`historyColumnContainer ${pageName}ColumnContainer`}
            >
              <h3 className={`${header}Header`}>{header}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const HistoryDateAndTimeColumn = (
  history: historyDataType[],
  historyPage: string,
  removeHistory: (id: number) => void
): ReactElement => {
  const { sortDirection, childId } = useHistoryIDComponent();
  return (
    <div className={`historyColumnContainer ${historyPage}ColumnContainer`}>
      {history
        .filter((history) => history.childId === childId)
        .sort((b, a) => {
          return historyInfoSortDirection(b, a, sortDirection);
        })
        .map((history) => {
          return (
            <div className="historyContainer" key={history.id}>
              <div className="historyTableContainer">
                <div className="dateTime">
                  <h4>Date: {history.date}</h4>
                  <h4>Time: {history.time}</h4>
                </div>
              </div>
              <button
                className="Delete button"
                onClick={() => {
                  removeHistory(history.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export const HistoryInfoColumn = (
  history: historyDataType[],

  historyProperty: CommonKeys<historyDataType>,
  suffix: string,
  historyPage: string
) => {
  const { sortDirection, childId } = useHistoryIDComponent();
  return (
    <div
      className={`historyColumnContainer ${historyPage}ColumnContainer ${historyProperty}ColumnContainer  newColumnContainer `}
    >
      {history
        .filter((history) => history.childId === childId)
        .sort((b, a) => {
          return historyInfoSortDirection(b, a, sortDirection);
        })
        .map((history, index) => {
          const specificHistory = history as HistoryInfoTypeData;
          return (
            <div className="historyContainer" key={index}>
              <div className="historyTableDateColumn">
                <div className="historyList">
                  <h4>{`${specificHistory[historyProperty]} ${suffix}`}</h4>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export const HistoryMobileView = (
  history: historyDataType[],
  historyProperty: CommonKeys<historyDataType>[],
  historyPropertyLabel: string[],
  suffix: string[],
  historyPage: string,
  removeHistory: (id: number) => void
) => {
  const { sortDirection, setSortDirection, childId } = useHistoryIDComponent();
  return (
    <div
      className={`mobileHistoryColumnContainer mobile${historyPage}ColumnContainer`}
    >
      <div className="sortingContainer">
        <div className="historySortingContainer">
          <label htmlFor="historySortingButtonsContainer">
            <h3>Date Order:</h3>
          </label>
          <div className="historySortingButtonsContainer">
            <button
              type="button"
              onClick={() => {
                setSortDirection("desc");
                localStorage.setItem("sortDirection", "desc");
              }}
              className={`latestButton ${
                sortDirection === "desc" ? "pressedButton" : ""
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => {
                setSortDirection("asc");
                localStorage.setItem("sortDirection", "asc");
              }}
              className={`oldestButton  ${
                sortDirection === "desc" ? "" : "pressedButton"
              }`}
            >
              Earliest
            </button>
          </div>
        </div>
      </div>
      {history
        .filter((history) => history.childId === childId)
        .sort((b, a) => {
          return historyInfoSortDirection(b, a, sortDirection);
        })
        .map((history) => {
          const specificHistory = history as HistoryInfoTypeData;
          return (
            <div className="mobileHistoryContainer" key={history.id}>
              <div className="mobileHistoryTableContainer">
                <div className="mobileDateTime">
                  <h4>Date: {history.date}</h4>
                  <h4>Time: {history.time}</h4>
                </div>

                {historyProperty.map((property, index) => (
                  <div
                    className={`mobile${property}`}
                    key={`${property}-${index}`}
                  >
                    <h4>{`${historyPropertyLabel[index]}: ${specificHistory[property]} ${suffix[index]}`}</h4>
                  </div>
                ))}
              </div>
              <button
                className="Delete button"
                onClick={() => {
                  removeHistory(history.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};
