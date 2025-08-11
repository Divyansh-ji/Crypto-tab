// News Service for handling crypto news API calls
const API_BASE_URL = 'https://api.coinstats.app/public/v1';

export const newsService = {
  // Fetch news by category with pagination
  async fetchNews(category = 'general', skip = 0, limit = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/news?skip=${skip}&limit=${limit}&category=${category}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data.news || [],
        hasMore: (data.news || []).length === limit
      };
    } catch (error) {
      console.error('News API Error:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  },

  // Search news (placeholder for future implementation)
  async searchNews(query, category = 'general') {
    // This would be implemented when the API supports search
    // For now, we'll return a placeholder
    console.log(`Searching for: ${query} in category: ${category}`);
    return {
      success: true,
      data: [],
      message: 'Search functionality coming soon!'
    };
  },

  // Get available news categories
  getCategories() {
    return [
      { value: "general", label: "General", icon: "📰" },
      { value: "bitcoin", label: "Bitcoin", icon: "₿" },
      { value: "ethereum", label: "Ethereum", icon: "Ξ" },
      { value: "defi", label: "DeFi", icon: "🏦" },
      { value: "nft", label: "NFT", icon: "🖼️" },
      { value: "regulation", label: "Regulation", icon: "⚖️" },
      { value: "mining", label: "Mining", icon: "⛏️" }
    ];
  },

  // Format timestamp to relative time
  formatTimestamp(timestamp) {
    if (!timestamp) return 'Recently';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  },

  // Validate news data
  validateNewsItem(item) {
    return {
      id: item.id || Math.random().toString(36).substr(2, 9),
      title: item.title || 'Untitled Article',
      description: item.description || 'No description available',
      link: item.link || '#',
      imgURL: item.imgURL || '/fallback-news.jpg',
      source: item.source || 'Unknown Source',
      publishedAt: item.publishedAt || null,
      category: item.category || 'general'
    };
  }
};

export default newsService; 