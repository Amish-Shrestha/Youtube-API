import { listOfDistinctData, transformLocalData } from "../data/transform";
import localAxiosInstance from "./localAxiosInstance";

export const updateLocalDbVideo = async (data) => {
  try {
    const response = await localAxiosInstance.post("/videos", data);
  } catch (e) {
    console.log(e);
    console.log("Failed to save the data");
  }
};

export const getLocalDbVideo = async () => {
  try {
    const response = await localAxiosInstance.get("/videos");
    const transformedData = transformLocalData(response.data);

    const distinctData = listOfDistinctData(transformedData);
    
    return distinctData;
  } catch (e) {
    console.log(e);
    console.log("Failed to load the data");
  }
};
