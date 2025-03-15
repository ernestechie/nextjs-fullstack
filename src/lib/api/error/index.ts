export const getUserFriendlyError = (err: unknown) => {
  console.log("getUserFriendlyError", err);

  const errorMessage =
    err instanceof Error ? err.message : "Unexpected error occured!";

  return errorMessage;
};
