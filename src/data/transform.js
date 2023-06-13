export const transformInputKeywords = (keyword) => {
  const data = keyword.split(",");

  for (let i = 0; i < data.length; i++) {
    data[i] = data[i].trim();
    if (data[i] === "") {
      data.splice(i, 1);
      i = 0;
    }
  }

  return encodeURIComponent(data.join("|"));
};

export const transformLocalData = (data) => {
  const transformed = [];

  data.forEach((each) => {
    if (Array.isArray(each)) {
      transformed.push(...each);
    } else {
      transformed.push(each);
    }
  });

  return transformed;
};

export const listOfDistincVideotData = (data) => {
  const distinct = [];
  data.forEach((each) => {
    if (
      !!each &&
      !distinct.find(
        (dist) => dist.snippet.channelTitle === each.snippet.channelTitle
      )
    ) {
      distinct.push(each);
    }
  });

  return distinct;
};

export const listOfDistinctData = (data) => {
  const distinct = [];
  data.forEach((each) => {
    if (!!each) {
      distinct.push(each);
    }
  });

  return distinct;
};
