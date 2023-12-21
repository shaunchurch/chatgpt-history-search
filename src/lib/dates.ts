import { formatDistance } from "date-fns";

// This function takes a Date object and returns a relative time string
export const toRelativeDate = (date: Date): string => {
  // Get the current date
  const now = new Date();

  // Calculate the relative distance in words
  const relativeDate = formatDistance(date, now, {
    addSuffix: true,
  });

  return relativeDate.replace("about ", "");
};
