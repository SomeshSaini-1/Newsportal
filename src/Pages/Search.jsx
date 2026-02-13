// src/pages/Search.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const fetchSearchResults = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setNews([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}/news?search=${encodeURIComponent(searchTerm)}&status=PUBLISHED&limit=50`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setNews(data.news || []);
        setTotalResults(data.total || data.news?.length || 0);
      } else {
        setError(data.message || "Failed to fetch search results");
      }
    } catch (err) {
      setError("Failed to connect to server. Please try again.");
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchSearchResults(query);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
    setNews([]);
  };

  const handleArticleClick = (articleId) => {
    navigate(`/news/${articleId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for news, topics, authors..."
                className="w-full pl-14 pr-12 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 w-full sm:w-auto px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors"
            >
              Search
            </button>
          </form>

          {query && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    Found <span className="font-bold text-orange-600">{totalResults}</span> results for{" "}
                    <span className="font-bold">"{query}"</span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-600 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : news.length === 0 && query ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any articles matching "<span className="font-semibold">{query}</span>"
            </p>
            <button
              onClick={clearSearch}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              Clear Search
            </button>
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {news.map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleArticleClick(article._id)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600" />
                  )}
                  {article.category?.name && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded">
                      {article.category.name}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.description}
                    </p>
                  )}
                  <div className="text-sm text-gray-500">
                    {article.author || "News Desk"} •{" "}
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔎</div>
            <h2 className="text-2xl font-bold mb-2">Start Searching</h2>
            <p className="text-gray-600">Enter a keyword to find news articles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;