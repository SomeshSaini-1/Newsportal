// src/pages/Category.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Category = () => {
  const params = useParams();
  const navigate = useNavigate();
  
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (id, pageNum = 1, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}/news?category=${id}&page=${pageNum}&limit=12&status=PUBLISHED`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        if (append) {
          setNews(prev => [...prev, ...(data.news || [])]);
        } else {
          setNews(data.news || []);
        }
        setTotalPages(data.totalPages || 1);
        setPage(pageNum);
        setHasMore(pageNum < (data.totalPages || 1));
      } else {
        setError(data.message || "Failed to fetch news");
      }
    } catch (err) {
      setError(
        "Failed to connect to server. Please make sure the backend is running."
      );
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchNews(params.id, 1, false);
      window.scrollTo(0, 0);
    }
  }, [params.id]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchNews(params.id, page + 1, true);
    }
  };

  const handleArticleClick = (articleId) => {
    navigate(`/news/${articleId}`);
  };

  // Split articles into featured and regular
  const featuredMain = news.length > 0 ? news[0] : null;
  const featuredSide = news.slice(1, 3);
  const regularArticles = news.slice(3);

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error && news.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Articles</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchNews(params.id, 1, false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {params.name || "Category"}
              </h1>
              <p className="text-gray-600 mt-1">
                {news.length > 0 
                  ? `${news.length}+ articles in this category`
                  : "Up-to-date coverage of what's happening"}
              </p>
            </div>
            <nav>
              <ul className="flex gap-2 text-sm font-medium text-gray-600">
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900">{params.name || "Category"}</li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {news.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <h2 className="text-2xl font-bold mb-2">No Articles Yet</h2>
            <p className="text-gray-600">Check back soon for new content in this category.</p>
          </div>
        ) : (
          <>
            {/* Featured Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
              {/* Main Big Featured */}
              {featuredMain && (
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  onClick={() => handleArticleClick(featuredMain._id)}
                  className="group cursor-pointer relative rounded-2xl overflow-hidden hover:shadow-lg bg-gray-900 aspect-[4/3] lg:aspect-[5/4]"
                >
                  {featuredMain.thumbnail ? (
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${featuredMain.thumbnail}`}
                      alt={featuredMain.title}
                      className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    {featuredMain.category?.name && (
                      <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded mb-4">
                        {featuredMain.category.name}
                      </span>
                    )}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 group-hover:text-orange-400 transition-colors">
                      {featuredMain.title}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base">
                      {featuredMain.author && `${featuredMain.author} • `}
                      {new Date(featuredMain.publishedAt || featuredMain.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Side Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {featuredSide.map((article, index) => (
                  <motion.div
                    key={article._id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => handleArticleClick(article._id)}
                    className="group cursor-pointer flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative w-full sm:w-5/12 h-48 sm:h-auto bg-gray-200">
                      {article.thumbnail ? (
                        <img 
                      src={`${import.meta.env.VITE_IMG_URL}${article.thumbnail}`}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:from-transparent" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-semibold text-lg leading-tight group-hover:text-red-700 transition-colors line-clamp-3">
                        {article.title}
                      </h3>
                      <p className="mt-auto text-sm text-gray-500 pt-3">
                        {article.author && `${article.author} • `}
                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Regular Articles Grid */}
            {regularArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {regularArticles.map((article, index) => (
                  <motion.div
                    key={article._id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => handleArticleClick(article._id)}
                    className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                      {article.thumbnail ? (
                        <img
                      src={`${import.meta.env.VITE_IMG_URL}${article.thumbnail}`}
                          // src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                      )}
                      {article.category?.name && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded">
                          {article.category.name}
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-red-700 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                          {article.description}
                        </p>
                      )}
                      <div className="text-sm text-gray-500 mt-auto">
                        {article.author || "News Desk"} • {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-16 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Loading...
                    </span>
                  ) : (
                    `Load More Articles`
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Category;



















// // src/pages/Health.jsx
// import React from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { motion } from "framer-motion";

// const articles = [
//   {
//     id: 1,
//     title:
//       "Muscle tissue damage, hormone imbalances: Hard workouts can lead to overtraining syndrome",
//     category: "Fitness",
//     author: "Nicole Blades",
//     date: "January 2, 2026",
//     image:
//       "https://images.unsplash.com/photo-1571019613454-1f929c9b1f94?auto=format&fit=crop&q=80&w=2340",
//     isFeatured: true,
//     big: true,
//   },
//   {
//     id: 2,
//     title:
//       "Heavy screen time for young children 'altered brain networks', linked to teen anxiety, research finds",
//     author: null,
//     date: "December 28, 2025",
//     image:
//       "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=2340",
//   },
//   {
//     id: 3,
//     title:
//       "A Pune startup is transforming radiology screening with AI. How it could fill crucial gap in healthcare",
//     author: "Udit Bubna",
//     date: "December 6, 2025",
//     image:
//       "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2340",
//   },
//   {
//     id: 4,
//     title: "How gut microbes impact sleep quality",
//     excerpt:
//       "A recent study suggests that gut microbiota composition may significantly influence sleep architecture and quality.",
//     source: "The Conversation",
//     date: "November 30, 2025",
//     image:
//       "https://images.unsplash.com/photo-1541783245831-57d8e0c4df0d?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 5,
//     title: "China's new method to boost birth rates — adding tax to condoms",
//     excerpt:
//       "Revised VAT law removes exemption from condoms, now subject to 13% tax...",
//     source: "Bloomberg News",
//     date: "December 3, 2025",
//     image:
//       "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 6,
//     title:
//       "Weight-loss drugs are changing. Here's what to know about the new GLP-1s",
//     source: "Bloomberg News",
//     date: "December 20, 2025",
//     image:
//       "https://images.unsplash.com/photo-1586776977679-c3e537df50a0?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 7,
//     title:
//       "Should you get screened for breast cancer annually? New study suggests better approach",
//     date: "December 25, 2025",
//     image:
//       "https://images.unsplash.com/photo-1579684384363-097e9a8d8c5a?auto=format&fit=crop&q=80&w=800",
//     category: "Opinion",
//   },
//   {
//     id: 8,
//     title: "How Gen-Z is changing the violent nature of protests worldwide",
//     source: "ThePrint Exclusive",
//     date: "December 15, 2025",
//     image:
//       "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
//   },
// ];

// const Category = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const featuredMain = articles.find((a) => a.isFeatured && a.big);
//   const featuredSide = articles.filter((a) => !a.isFeatured && a.id <= 3);
//   const regularArticles = articles.filter((a) => a.id > 3);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 ">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {params.data || "Health"}
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Up-to-date coverage of what's happening in the world of health.
//               </p>
//             </div>
//             <nav>
//               <ul className="flex gap-6 text-sm font-medium">
//                 <li>
//                   <Link to="/" className="hover:text-blue-600 transition">
//                     Home
//                   </Link>{" "}
//                   / {params.data || "Health"}
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Featured Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
//           {/* Main Big Featured */}
//           {featuredMain && (
//             <motion.div
//               initial={{ opacity: 0, y: 60 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.8 }}
//               viewport={{ once: true }}
//               onClick={() => navigate("/details")}
//               className=" group cursor-pointer relative rounded-2xl overflow-hidden hover:shadow-lg bg-gray-900 aspect-[4/3] lg:aspect-[5/4]"
//             >
//               <img
//                 src={featuredMain.image}
//                 alt={featuredMain.title}
//                 className="absolute inset-0 w-full h-full object-cover brightness-90
//                  group-hover:brightness-100 transition-all duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//               <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
//                 {featuredMain.category && (
//                   <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded mb-4">
//                     {featuredMain.category}
//                   </span>
//                 )}
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 group-hover:text-orange-700 transition-colors">
//                   {featuredMain.title}
//                 </h2>
//                 <p className="text-gray-200 text-sm md:text-base">
//                   {featuredMain.author && `${featuredMain.author} • `}
//                   {featuredMain.date}
//                 </p>
//               </div>
//             </motion.div>
//           )}

//           {/* Side Featured */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
//             {featuredSide.map((article, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 onClick={() => navigate("/details")}
//                 className=" group cursor-pointer flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="relative w-full sm:w-5/12 h-48 sm:h-auto">
//                   <img
//                     src={article.image}
//                     alt={article.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:from-transparent" />
//                 </div>
//                 <div className="p-5 flex-1 flex flex-col">
//                   <h3 className="font-semibold text-lg leading-tight group-hover:text-red-700 transition-colors line-clamp-3">
//                     {article.title}
//                   </h3>
//                   <p className="mt-auto text-sm text-gray-500 pt-3">
//                     {article.author && `${article.author} • `}
//                     {article.date}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Regular Articles Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//           {regularArticles.map((article, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 60 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               onClick={() => navigate("/details")}
//               className=" group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
//             >
//               <div className="relative aspect-[16/10] overflow-hidden">
//                 <img
//                   src={article.image}
//                   alt={article.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                 />
//                 {article.category && (
//                   <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded">
//                     {article.category}
//                   </span>
//                 )}
//               </div>

//               <div className="p-5 flex flex-col flex-grow">
//                 <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-red-700 transition-colors line-clamp-2">
//                   {article.title}
//                 </h3>
//                 {article.excerpt && (
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
//                     {article.excerpt}
//                   </p>
//                 )}
//                 <div className="text-sm text-gray-500 mt-auto">
//                   {article.source || "Health Desk"} • {article.date}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="mt-16 text-center">
//           <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg">
//             Load More Health Stories
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Category;
