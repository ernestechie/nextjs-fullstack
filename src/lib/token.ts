export const tokenHasExpired = (time: number) => {
  let tokenExpired = false;
  // Check if token more than 24 hours
  const expiryDate = new Date(time).getTime() * 1000;
  const todayDate = new Date().getTime();

  const timeDifference = todayDate - expiryDate;
  // Check if token more than 24 hours
  const timeDifferenceInHours = timeDifference / 1000 / 60 / 60;

  if (timeDifferenceInHours >= 24) tokenExpired = true;

  return tokenExpired;
};
