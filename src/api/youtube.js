import {
  listOfDistincVideotData,
  listOfDistinctData,
  transformInputKeywords,
} from "../data/transform";
import {
  generateChannelSearchRequest,
  generateKeyWordSearchRequest,
} from "../data/youtubeApiRequest";
import { updateLocalDbVideo } from "./localDb";

export const getKeywordData = async (keyword, nextPageToken, callBack) => {
  const searchKeyword = keyword.trim();
  const transformedKeyword = transformInputKeywords(searchKeyword);
  const apiKey = ""; // Replace with your YouTube Data API key  

  const url = generateKeyWordSearchRequest(
    apiKey,
    transformedKeyword,
    nextPageToken
  );
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const distinctData = listOfDistincVideotData(data.items);

      const actions = distinctData.map((item) => {
        const channelId = item.snippet.channelId;
        const channelGetUrl = generateChannelSearchRequest(apiKey, channelId);

        return fetch(channelGetUrl)
          .then((response) => response.json())
          .then((data) => {
            const channelStats = data.items[0];
            if (channelStats.snippet.country === "US") {
              return {
                video: item,
                channel: channelStats,
              };
            }
          })
          .catch((err) => console.log("Error occurred: ", err));
      });

      return Promise.all(actions).then((result) => {
        const distinct = listOfDistinctData(result);
        updateLocalDbVideo(distinct);

        return {
          nextPageToken: data.nextPageToken,
          videos: distinct,
        };
      });
    })
    .catch((err) => {
      console.log("Error occurred: ", err);
      return null;
    });
};
