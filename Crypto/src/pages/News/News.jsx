import React, { useState, useEffect } from "react";
import "./News.css";
import NewsComponent from "../../components/News/News";

const NewsPage = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Mock trending topics - in a real app, this would come from an API
  useEffect(() => {
    setTrendingTopics([
      "Bitcoin ETF",
      "Ethereum 2.0",
      "DeFi Protocols",
      "NFT Market",
      "Crypto Regulation",
      "Web3 Development",
      "Layer 2 Solutions",
      "Stablecoins"
    ]);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // In a real implementation, you would search through news articles
      // For now, we'll just simulate a search
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  const handleTopicClick = (topic) => {
    setSearchQuery(topic);
  };

  return (
    <div className="news-page">
      <div className="news-hero">
        <div className="hero-content">
          <h1>📰 Crypto Daily News</h1>
          <p>Stay updated with the latest cryptocurrency news, market trends, and blockchain developments</p>
          
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Search for crypto news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn" disabled={isSearching}>
                {isSearching ? "Searching..." : "🔍 Search"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="trending-section">
        <h2>🔥 Trending Topics</h2>
        <div className="trending-topics">
          {trendingTopics.map((topic, index) => (
            <button
              key={index}
              className="topic-tag"
              onClick={() => handleTopicClick(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="news-content">
        <NewsComponent />
      </div>

      <div className="news-features">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Market Analysis</h3>
          <p>Get insights into market movements and price trends</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <h3>Real-time Updates</h3>
          <p>Stay informed with breaking news and live updates</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile Optimized</h3>
          <p>Access news on any device with responsive design</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPage; 