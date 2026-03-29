


import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const Rightbar = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ताजा खबरें
  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}/hindinews?limit=12&status=PUBLISHED&trending=true`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setNews(data.news || []);
      } else {
        setError(data.message || "Failed to fetch ताजा खबरें");
      }
    } catch (err) {
      setError("Cannot connect to server. Please try again later.");
      console.error("Trending fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-scroll effect – only on larger screens or when not touched
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || news.length === 0) return;

    // Disable auto-scroll on mobile / small screens
    if (window.innerWidth < 1024) return; // lg breakpoint

    let animationId;
    let scrollAmount = 0;
    const speed = 0.4; // slower on desktop feels smoother

    const scroll = () => {
      scrollAmount += speed;
      container.scrollTop = scrollAmount;

      // Reset position for seamless loop (if duplicating content)
      if (scrollAmount >= container.scrollHeight / 2) {
        scrollAmount -= container.scrollHeight / 2;
        container.scrollTop = scrollAmount;
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => (animationId = requestAnimationFrame(scroll));

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);

    // Also pause when window is resized to mobile size
    const handleResize = () => {
      if (window.innerWidth < 1024) pause();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
      window.removeEventListener('resize', handleResize);
    };
  }, [news]);

  const handleArticleClick = (articleId) => {
    navigate(`/news/${articleId}`);
  };

  // ── Loading UI ────────────────────────────────────────
  if (loading) {
    return (
      <aside className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 pb-3 border-b-2 border-red-600">
          ताजा खबरें
        </h2>
        <div className="flex items-center justify-center py-12 sm:py-16">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-red-600"></div>
        </div>
      </aside>
    );
  }

  // ── Error UI ──────────────────────────────────────────
  if (error) {
    return (
      <aside className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 pb-3 border-b-2 border-red-600">
          ताजा खबरें
        </h2>
        <div className="text-center py-8 sm:py-10">
          <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
          <button
            onClick={fetchNews}
            className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </aside>
    );
  }

  // ── Empty UI ──────────────────────────────────────────
  if (news.length === 0) {
    return (
      <aside className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 pb-3 border-b-2 border-red-600">
          ताजा खबरें
        </h2>
        <div className="text-center py-8 sm:py-12 text-gray-500 text-sm sm:text-base">
          फिलहाल कोई ट्रेंडिंग स्टोरी नहीं है
        </div>
      </aside>
    );
  }

  // ── Main Content ──────────────────────────────────────
  return (
    <aside className="bg-white rounded-xl shadow-sm lg:sticky lg:top-6 p-4 sm:p-5 lg:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-5 pb-3 border-b-2 border-red-600">
        ताजा खबरें
      </h2>

      <div
        ref={scrollRef}
        className={`
          space-y-4 
          overflow-y-auto 
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
          max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] xl:max-h-[80vh]
          -mr-2 pr-2 lg:pr-0 lg:mr-0
        `}
      >
        {news.map((item, index) => (
          <article
            key={`${item._id}-${index}`}
            onClick={() => handleArticleClick(item._id)}
            className="
              flex gap-3 sm:gap-4 
              pb-4 border-b border-gray-200 last:border-0 
              cursor-pointer 
              hover:bg-gray-50 active:bg-gray-100 
              transition-colors rounded-lg p-2 sm:p-3
              touch-manipulation
            "
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              {item.thumbnail ? (
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${item.thumbnail}`}
                  alt={item.title || "News thumbnail"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/fallback-news.jpg'; // optional fallback image
                    e.target.style.objectFit = 'contain';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <span className="text-white text-xs font-bold"> खबरें</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base leading-tight mb-1.5 sm:mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {item.author || "Media Plus"} •{' '}
                {new Date(item.publishedAt || item.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
};


