import { DateTime } from "luxon";

export function addLuxonHours(hours: number) {
  return DateTime.now().plus({ hours }).toJSDate();
}
