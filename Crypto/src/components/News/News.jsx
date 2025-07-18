import React, { useEffect, useState } from "react";
import "./News.css";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coinstats.app/public/v1/news?skip=0&limit=10&category=general"
    )
      .then((res) => res.json())
      .then((data) => setNews(data.news))
      .catch((err) => console.error("Failed to fetch news:", err));
  }, []);

  return (
    <div className="news-section">
      <h2 className="news-title">
        📰 Crypto News <span>(Updated Daily)</span>
      </h2>
      <div className="news-container">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card"
          >
            <img src={item.imgURL} alt="news" />
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.description.slice(0, 100)}...</p>
              <span className="source">{item.source}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default News;
