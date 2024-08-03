export const buildQueryString = (obj) => {
  const queryString = Object.keys(obj)
    .filter(
      (key) => obj[key] !== "" && obj[key] !== undefined && obj[key] !== null
    )
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");

  return queryString;
};

