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
export const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const createShortHandDate = (date: string) => {
  const dateParts = date.split("-"); // Split the input date string
  return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
};
export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

console.log(formatDate("01/10/2024"));

export const calculateAge = (DOB: string): number => {
  const currentDate = new Date();
  const birthdate = new Date(DOB);

  let age = currentDate.getFullYear() - birthdate.getFullYear();

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < birthdate.getMonth() ||
    (currentDate.getMonth() === birthdate.getMonth() &&
      currentDate.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
};
export const calculateAgeInMonths = (DOB: string): number => {
  const currentDate = new Date();
  const birthdate = new Date(DOB);

  let months = (currentDate.getFullYear() - birthdate.getFullYear()) * 12;
  months += currentDate.getMonth() - birthdate.getMonth();

  // Check if the birthday has occurred this month
  if (currentDate.getDate() < birthdate.getDate()) {
    months--;
  }

  return months;
};

export const calculateAgeInDays = (DOBString: string): number => {
  const dob = new Date(DOBString);

  const currentDate = new Date();

  const diffInTime = currentDate.getTime() - dob.getTime();

  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  return diffInDays;
};

export const convertAgeToAppropriateAgeType = (DOB: string): string => {
  const shortHandDate = createShortHandDate(DOB);

  console.log(shortHandDate);

  if (calculateAgeInDays(shortHandDate) === 0) {
    return `Today`;
  } else if (calculateAgeInDays(shortHandDate) === 1) {
    return `${calculateAgeInDays(shortHandDate)} day`;
  } else if (calculateAgeInMonths(shortHandDate) >= 24) {
    console.log(calculateAge(shortHandDate));
    return `${calculateAge(shortHandDate)} yrs`;
  } else if (
    calculateAgeInMonths(shortHandDate) < 24 &&
    calculateAgeInMonths(shortHandDate) > 1
  ) {
    console.log(calculateAgeInMonths(shortHandDate));
    return `${calculateAgeInMonths(shortHandDate)} months`;
  } else {
    console.log(calculateAgeInDays(shortHandDate));
    return `${calculateAgeInDays(shortHandDate)} days`;
  }
};
