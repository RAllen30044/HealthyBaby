import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistoryIDComponent } from "../../HistoryProvider";
import {
  DaipersHistoryInfoTypes,
  IllnessType,
  bottleFeedingInfoType,
  breastFeedingInfoType,
  infantFeedingInfoType,
  nappingType,
} from "../../Types";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

type historyDataType =
  | breastFeedingInfoType
  | bottleFeedingInfoType
  | infantFeedingInfoType
  | nappingType
  | IllnessType
  | DaipersHistoryInfoTypes;

type UnionKeys<T> = T extends T ? keyof T : never;

type CommonKeys<T> = UnionKeys<T> extends infer U
  ? U extends UnionKeys<T>
    ? U
    : never
  : never;

export type HistoryInfoTypeData = {
  time: string;
  date: string;
  id: string;
  feedingTimeLength: string;
  childId: string;

  drinkType: string;
  foodType: string;

  medicineOz: string;
  bottleOz: string;
  bottleOzLeft: string;

  symptoms: string;
  medicineGiven: string;

  consistancy: string;
  diaperType: string;

  lengthOfTime: string;
};

const historyInfoSortDirection = (
  date1: historyDataType,
  date2: historyDataType,
  sortDirection: string
) => {
  if (sortDirection === "asc") {
    if (new Date(date1.date) < new Date(date2.date)) {
      return -1;
    }
    if (new Date(date1.date) > new Date(date2.date)) {
      return 1;
    }

    return 0;
  }
  if (sortDirection === "desc") {
    if (new Date(date2.date) < new Date(date1.date)) {
      return -1;
    }
    if (new Date(date2.date) > new Date(date1.date)) {
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
  const { setSortDirection } = useHistoryIDComponent();

  return (
    <div className="historyTableHeader" key={`${pageName}Header`}>
      <div className={`historyColumnContainer ${pageName}ColumnContainer`}>
        <h3 className="dateTime dateTimeHeader">
          Date/Time
          <div className="arrowContainer">
            <FontAwesomeIcon
              icon={faArrowDown}
              onClick={() => {
                setSortDirection("desc");
              }}
              className={`arrowDown${pageName}`}
            />
            {"   "}
            <FontAwesomeIcon
              icon={faArrowUp}
              onClick={() => {
                setSortDirection("asc");
              }}
              className={`arrowUp${pageName}`}
            />
          </div>
        </h3>
      </div>
      {headerValue.map((header, index) => {
        return (
          <div className={`historyColumnContainer ${pageName}ColumnContainer`}>
            <h3 key={index} className={`${header}Header`}>
              {header}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export const HistoryDateAndTimeColumn = (
  history: historyDataType[],
  historyPage: string,
  removeHistory: (id: string) => void
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
  removeHistory: (id: string) => void
) => {
  const { sortDirection, childId } = useHistoryIDComponent();
  return (
    <div
      className={`mobileHistoryColumnContainer mobile${historyPage}ColumnContainer`}
    >
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
                <div className="moblieDateTime">
                  <h4>Date: {history.date}</h4>
                  <h4>Time: {history.time}</h4>
                </div>
                {historyProperty.map((historyProperty, index) => {
                  return suffix.map((suffix) => {
                    <div className={`mobile${historyProperty}`} key={index}>
                      {historyPropertyLabel.map((historyLabel) => {
                        return (
                          <h4>{`${historyLabel}: ${specificHistory[historyProperty]} ${suffix}`}</h4>
                        );
                      })}
                    </div>;
                  });
                })}
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
