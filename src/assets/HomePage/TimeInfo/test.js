const calculateAge = (DOB) => {
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

const createShortHandDate = (date) => {
  const dateParts = date.split("-"); // Split the input date string
  return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
};

const calculateAgeInMonths = (DOB) => {
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

const calculateAgeInDays = (DOBString) => {
  const dob = new Date(DOBString);

  const currentDate = new Date();

  const diffInTime = currentDate.getTime() - dob.getTime();

  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  return diffInDays;
};

const convertAgeToAppropriateAgeType = (DOB) => {
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

console.log(convertAgeToAppropriateAgeType("2024-02-05"));
