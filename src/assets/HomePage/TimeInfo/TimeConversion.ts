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
export const createShortHandDate =(date:string)=>{
  
const dateParts = date.split('-'); // Split the input date string
return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`
}
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

export function calculateAge(DOB: string) {
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
}
export function calculateAgeInMonths(DOB: string) {
  const currentDate = new Date();
  const birthdate = new Date(DOB);

  let months = (currentDate.getFullYear() - birthdate.getFullYear()) * 12;
  months += currentDate.getMonth() - birthdate.getMonth();

  // Check if the birthday has occurred this month
  if (currentDate.getDate() < birthdate.getDate()) {
    months--;
  }

  return months;
}
