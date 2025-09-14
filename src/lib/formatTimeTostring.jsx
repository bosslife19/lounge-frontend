export function formatTimeToString(timeString) {
  const [hour, minute] = timeString.split(":").map(Number);

  const date = new Date();
  date.setHours(hour, minute);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}


