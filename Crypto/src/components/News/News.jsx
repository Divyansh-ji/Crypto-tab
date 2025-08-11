import React, { useEffect, useState } from "react";
import "./News.css";
import { newsService } from "../../services/newsService";

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const categories = newsService.getCategories();

  const fetchNews = async (category = selectedCategory, page = 0) => {
    try {
      setLoading(true);
      setError("");
      
      const result = await newsService.fetchNews(category, page * 10, 10);
      
      if (result.success) {
        const validatedNews = result.data.map(item => newsService.validateNewsItem(item));
        
        if (page === 0) {
          setNews(validatedNews);
        } else {
          setNews(prev => [...prev, ...validatedNews]);
        }
        
        setHasMore(result.hasMore);
        setCurrentPage(page);
      } else {
        setError(result.error || "Failed to load news");
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
    setNews([]);
    fetchNews(category, 0);
  };

  const loadMoreNews = () => {
    if (!loading && hasMore) {
      fetchNews(selectedCategory, currentPage + 1);
    }
  };

  const handleNewsClick = (newsItem) => {
    // Track news clicks for analytics (optional)
    console.log(`News clicked: ${newsItem.title}`);
  };

  return (
    <div className="news-section">
      <div className="news-header">
        <h2 className="news-title">
          📰 Crypto Daily News <span>(Real-time Updates)</span>
        </h2>
        
        <div className="news-controls">
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.value)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="error-container">
          <p className="error">{error}</p>
          <button onClick={() => fetchNews()} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {loading && news.length === 0 && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading latest crypto news...</p>
        </div>
      )}

      <div className="news-container">
        {news.map((item, index) => (
          <div
            key={item.id || index}
            className="news-card"
            onClick={() => handleNewsClick(item)}
          >
            <div className="news-image-container">
              <img 
                src={item.imgURL} 
                alt={item.title}
                onError={(e) => {
                  e.target.src = "/fallback-news.jpg";
                }}
              />
              <div className="news-category">{item.category.toUpperCase()}</div>
            </div>
            
            <div className="news-content">
              <h3 className="news-title-text">{item.title}</h3>
              <p className="news-description">
                {item.description}...
              </p>
              
              <div className="news-meta">
                <span className="news-source">{item.source}</span>
                <span className="news-time">
                  {newsService.formatTimestamp(item.publishedAt)}
                </span>
              </div>
              
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more-btn"
                onClick={(e) => e.stopPropagation()}
              >
                Read Full Article →
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <div className="load-more-container">
          <button 
            onClick={loadMoreNews} 
            className="load-more-btn"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More News"}
          </button>
        </div>
      )}

      {!loading && news.length === 0 && !error && (
        <div className="no-news">
          <p>No news available for this category at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default News;
