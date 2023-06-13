import React from "react";
import { getKeywordData } from "./api/youtube";
import { getLocalDbVideo } from "./api/localDb";

function App() {
  const [keyword, setKeyword] = React.useState("");
  const [videoCollection, setVideoCollection] = React.useState([]);
  const [pagination, setPagination] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const keywordInput = (event) => {
    setKeyword(event.target.value);
  };

  const searchTrigger = async () => {
    if (keyword.length >= 3) {
      setLoading(true);
      const data = await getKeywordData(keyword, null);
      setPagination(data.nextPageToken);
      if (data.videos) setVideoCollection(data.videos || []);
      setLoading(false);
    }
  };

  const loadMoreResult = async () => {
    if (pagination) {
      setLoading(true);
      const data = await getKeywordData(keyword, pagination);
      setPagination(data.nextPageToken);
      if (data.videos) setVideoCollection(data.videos || []);
      setLoading(false);
    }
  };

  const localDbSearchTrigger = async () => {
    setLoading(true);
    const data = await getLocalDbVideo();
    if (data) setVideoCollection(data || []);
    setLoading(false);
  };

  return (
    <div className="container-lg pt-2">
      <div className="row col-12 py-2">
        <div className="col-8">
          <h2 className="align-bottom">Project</h2>
          <h6 className="align-bottom text-secondary">Youtube Data Collection</h6>
        </div>
      </div>
      <hr />
      <div className="col-12">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="keyword"
            value={keyword}
            placeholder="Keyword (e.g. Pc build, Custom pc build, budget pc)"
            aria-label="Enter search keyword..."
            aria-describedby="button-addon2"
            onChange={keywordInput}
          />
          <button
            className="btn btn-success"
            type="button"
            id="search-button"
            disabled={loading}
            onClick={searchTrigger}
          >
            Search
          </button>
          <button
            className="btn btn-outline-primary"
            type="button"
            id="local-button"
            onClick={localDbSearchTrigger}
          >
            Get Saved
          </button>
        </div>
        <div className="row">
          <div className="col-8 form-text " id="basic-addon4">
            Seperated by commas and at least 3 characters
          </div>
          {pagination && !loading && (
            <div className="col-4 text-end">
              <button className="btn btn-outline-info" onClick={loadMoreResult}>
                Load New
              </button>
            </div>
          )}
        </div>
      </div>

      <hr />
      {loading && (
        <div className="col-12 ">
          <span
            className="spinner-border spinner-border-sm text-warning"
            role="status"
            aria-hidden="true"
          ></span>
          <span> Loading...</span>
        </div>
      )}

      {!videoCollection.length && !loading && (
        <div className="col-12">
          <div className="alert alert-light" role="alert">
            No data found
          </div>
        </div>
      )}
      <div className="col-12 row">
        {videoCollection.map((each) => {
          const videoId = each.video.id.videoId;
          const thumbnail = each.video.snippet.thumbnails.high.url;
          const title = each.video.snippet.title;
          const channel = each.video.snippet.channelTitle;
          const country = each.channel.snippet.country;

          return (
            <div className="pt-2 pb-4 col-lg-3 col-md-4 col-sm-6" key={videoId}>
              <div className="card">
                <img src={thumbnail} className="card-img-top" alt={title} />
                <div className="card-body">
                  <h6 className="card-title text-truncate">{title}</h6>
                  <p className="card-text text-truncate">
                    {channel} | {country}
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    className="btn btn-outline-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Watch
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
