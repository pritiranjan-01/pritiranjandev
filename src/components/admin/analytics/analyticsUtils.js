export const getFlagEmoji = (countryCode) => {
  if (
    !countryCode ||
    countryCode === "UN" ||
    countryCode === "LH" ||
    countryCode.toUpperCase() === "LOCAL"
  ) {
    return "🌐";
  }
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return "🌐";
  }
};

export const parseUserAgent = (ua) => {
  if (!ua) return "Unknown Device";

  let browser = "Browser";
  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome/"))
    browser = "Safari";
  else if (ua.includes("Opera/") || ua.includes("OPR/"))
    browser = "Opera";
  else if (ua.includes("PostmanRuntime/")) browser = "Postman";
  else if (ua.includes("Googlebot/")) browser = "Googlebot";
  else if (ua.includes("curl/")) browser = "cURL";

  let os = "OS";
  if (ua.includes("Windows NT")) os = "Windows";
  else if (ua.includes("Macintosh") || ua.includes("Mac OS X"))
    os = "macOS";
  else if (ua.includes("iPhone")) os = "iOS";
  else if (ua.includes("iPad")) os = "iPadOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";

  return `${browser} on ${os}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return dateStr;
  }
};
