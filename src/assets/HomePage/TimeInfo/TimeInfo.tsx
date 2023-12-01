export const TimeInfo = () => {
  return (
    <>
      <div className="time">
        <label htmlFor="time">Time:</label>
        <input type="text" id="time" />
      </div>
      <div className="date">
        <label htmlFor="date">Date:</label>
        <input type="text" id="date" />
      </div>
    </>
  );
};
