export const generateKeyWordSearchRequest = (
  API_KEY,
  keywords,
  nextPageToken,
  regionCode = "US"
) => {
  const maxResults = 50;
  let baseUrl = "https://www.googleapis.com/youtube/v3/search?part=id,snippet";

  if (nextPageToken) {
    baseUrl += `&pageToken=${nextPageToken}`;
  }

  return (
    baseUrl +
    `&q=${keywords}&key=${API_KEY}&regionCode=${regionCode}&maxResults=${maxResults}&type=video&relevanceLanguage=en`
  );
};

export const generateChannelSearchRequest = (API_KEY, channelId) => {
  const baseUrl =
    "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&";

  return baseUrl + `id=${channelId}&key=${API_KEY}`;
};
