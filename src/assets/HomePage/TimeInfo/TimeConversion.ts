export function convertToStandardTime(time24hr: string) {
  // Split the input time string into hours and minutes
  const [hours, minutes] = time24hr.split(":");

  // Convert hours to a number
  const hoursNum = parseInt(hours, 10);

  // Determine whether it's AM or PM
  const period = hoursNum >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12hr = hoursNum % 12 || 12;

  // Create the formatted time string
  const standardTime = `${hours12hr}:${minutes} ${period}`;

  return standardTime;
}


export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-us", options);
};
