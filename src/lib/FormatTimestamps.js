export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  // Options for formatting
  const options = {
    weekday: "long", // Friday
    day: "numeric",  // 4
    month: "long",   // July
    year: "numeric", // 2025
  };

  return date.toLocaleDateString("en-US", options);
}

