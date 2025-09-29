// utils/dateFormat.js
export const formatDate = (
  dateString ,
  options
) => {
  if (!dateString) return "";

  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  // Default format: "28 Sep 2025, 14:30"
  const defaultOptions  = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return date.toLocaleString(undefined, options || defaultOptions);
};


 export function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = Math.floor((now - past) / 1000); // difference in seconds

    if (diff < 60) {
      return `${diff} sec${diff !== 1 ? "s" : ""} ago`;
    } else if (diff < 3600) {
      const mins = Math.floor(diff / 60);
      return `${mins} min${mins !== 1 ? "s" : ""} ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (diff < 2592000) {
      const days = Math.floor(diff / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (diff < 31536000) {
      const months = Math.floor(diff / 2592000);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(diff / 31536000);
      return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
  }