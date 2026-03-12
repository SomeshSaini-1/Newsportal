// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import NewsBox from "../component/Newsbox";
// import { motion } from "framer-motion";
// import { Rightbar } from "../component/Rightbar";
// import Newsvideo from "../component/Newsvideo";

// const Home = () => {
//   const [news, setNews] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState(null);
//   const [selectedNews, setSelectedNews] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const navigate = useNavigate();

//   const API_BASE_URL = import.meta.env.VITE_API_URL;

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/categories`);
//       const data = await response.json();
//       setCategories(data);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   // Fetch news
//   const fetchNews = async (categoryId = null, query = "", pageNum = 1) => {
//     setLoading(true);
//     setError(null);

//     try {
//       let url = `${API_BASE_URL}/news?page=${pageNum}&limit=20&status=PUBLISHED`;

//       if (query) {
//         url += `&search=${encodeURIComponent(query)}`;
//       } else if (categoryId) {
//         url += `&category=${categoryId}`;
//       }

//       const response = await fetch(url);
//       const data = await response.json();

//       if (response.ok) {
//         setNews(data.news || []);
//         setTotalPages(data.totalPages || 1);
//         setPage(pageNum);
//       } else {
//         setError(data.message || "Failed to fetch news");
//       }
//     } catch (err) {
//       setError(
//         "Failed to connect to server. Please make sure the backend is running.",
//       );
//       console.error("Error fetching news:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch videos
//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/videos?limit=4&type=Shorts`);
//       const data = await response.json();
//       if (response.ok) {
//         setVideos(data.videos || []);
//       }
//     } catch (err) {
//       console.error("Error fetching videos:", err);
//     }
//   };

//   // Handle news click
//   const handleNewsClick = (article) => {
//     setSelectedNews(article);
//     navigate(`/news/${article._id || article.id}`);
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       fetchNews(selectedCategory, searchQuery, newPage);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchNews();
//     fetchVideos();
//   }, []);

//   console.log(videos,"news datas")

//   return (
//     <motion.div
//       variants={{
//         hidden: { opacity: 0, y: 30 },
//         visible: { opacity: 1, y: 0 },
//       }}
//       initial="hidden"
//       animate="visible"
//       transition={{ duration: 1.2 }}
//       className="min-h-screen bg-white"
//     >
//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {loading ? (
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading news...</p>
//             </div>
//           </div>
//         ) : error ? (
//           <div className="text-center py-20">
//             <p className="text-red-600 text-lg mb-4">{error}</p>
//             <button
//               onClick={() => fetchNews(selectedCategory, searchQuery)}
//               className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
//             >
//               Retry
//             </button>
//           </div>
//         ) : news.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-gray-600 text-lg">No articles found</p>
//           </div>
//         ) : (
//           <>
//             <div className="flex flex-col lg:flex-row gap-8">
//               {/* Left content area */}
//               <div className="flex-1">
//                 {/* Top Stories */}
//                 <div className="mb-12">
//                   <h2 className="text-2xl font-bold mb-4 border-b-2 border-orange-500 inline-block">
//                     Top Stories
//                   </h2>

//                   <div className="grid grid-cols-1 gap-6">
//                     {news[0] && (
//                       <div className="shadow-lg p-2">
//                         <NewsBox
//                           news={news[0]}
//                           size="large"
//                           onClick={() => handleNewsClick(news[0])}
//                         />
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {news.slice(1, 3).map((article, index) => (
//                         <NewsBox
//                           key={article._id || index}
//                           news={article}
//                           size="medium"
//                           onClick={() => handleNewsClick(article)}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Subscription Banner */}
//                 <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//                   <div className="text-center sm:text-left">
//                     <p className="text-lg font-semibold leading-tight">
//                       GET THE YEAR-END OFFER
//                       <br />
//                       <span className="text-xl">
//                         3 years of TheNews for Rs. 10,000
//                       </span>
//                     </p>
//                   </div>
//                   <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded-md transition-colors whitespace-nowrap">
//                     Subscribe Now
//                   </button>
//                 </div>

//                 {categories?.slice(0, 1)?.map((cat) => (
//                   <div className="mb-12">
//                     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//                       <div className="bg-gray-50 px-6 py-4 flex items-center gap-4">
//                         <h2 className="text-2xl font-bold text-gray-800">
//                           {cat.name}
//                         </h2>
//                         <div className="flex-1 h-1 bg-red-700"></div>
//                       </div>

//                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//                         {news
//                           // .slice(3, 11)
//                           .filter((ele) => ele.category.name === cat.name)
//                           .length === 0 ? (
//                           <p>No Data</p>
//                         ) : (
//                           news
//                             // .slice(3, 11)
//                             .filter((ele) => ele.category.name === cat.name)
//                             .map((article) => (
//                               <NewsBox
//                                 key={article._id || article.id}
//                                 news={article}
//                                 onClick={() => handleNewsClick(article)}
//                               />
//                             ))
//                         )}

//                         {/* {news
//                           .slice(3, 11)
//                           .filter((ele) => ele.category.name === cat.name)
//                           .map((article) => (
//                             <NewsBox
//                               key={article._id || article.id}
//                               news={article}
//                               onClick={() => handleNewsClick(article)}
//                             />
//                           ))} */}
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Latest Videos */}
//                 {videos.length > 0 && (
//                   <div className="mb-12">
//                     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//                       <div className="bg-gray-50 px-6 py-4 flex items-center gap-4">
//                         <h2 className="text-2xl font-bold text-gray-800">
//                           Shorts
//                         </h2>
//                         <div className="flex-1 h-1 bg-red-700"></div>
//                       </div>

//                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//                         {videos.map((video) => (
//                           <Newsvideo
//                             key={video._id || video.id}
//                             video={video}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {categories?.slice(1)?.map((cat) => (
//                   <div className="mb-12" key={cat._id}>
//                     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//                       <div className="bg-gray-50 px-6 py-4 flex items-center gap-4">
//                         <h2 className="text-2xl font-bold text-gray-800">
//                           {cat.name}
//                         </h2>
//                         <div className="flex-1 h-1 bg-red-700"></div>
//                       </div>

//                       <div  key={cat._id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//                         {news
//                           // .slice(3, 11)
//                           .filter((ele) => ele.category.name === cat.name)
//                           .length === 0 ? (
//                           <p>No Data</p>
//                         ) : (
//                           news
//                             // .slice(3, 11)
//                             .filter((ele) => ele.category.name === cat.name)
//                             .map((article) => (
//                               <NewsBox
//                                 key={article._id || article.id}
//                                 news={article}
//                                 onClick={() => handleNewsClick(article)}
//                               />
//                             ))
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {/* More News */}
//                 {news.length > 11 && (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                     {news.slice(11).map((article) => (
//                       <NewsBox
//                         key={article._id || article.id}
//                         news={article}
//                         onClick={() => handleNewsClick(article)}
//                       />
//                     ))}
//                   </div>
//                 )}

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex justify-center gap-2 mt-8">
//                     <button
//                       onClick={() => handlePageChange(page - 1)}
//                       disabled={page === 1}
//                       className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Previous
//                     </button>

//                     <div className="flex gap-2">
//                       {[...Array(totalPages)].map((_, i) => (
//                         <button
//                           key={i}
//                           onClick={() => handlePageChange(i + 1)}
//                           className={`px-4 py-2 rounded ${
//                             page === i + 1
//                               ? "bg-orange-600 text-white"
//                               : "bg-gray-200 hover:bg-gray-300"
//                           }`}
//                         >
//                           {i + 1}
//                         </button>
//                       ))}
//                     </div>

//                     <button
//                       onClick={() => handlePageChange(page + 1)}
//                       disabled={page === totalPages}
//                       className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Rightbar */}
//               <div className="lg:w-80">
//                 <Rightbar />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default Home;

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NewsBox from "../component/Newsbox";
import { motion } from "framer-motion";
import { Rightbar } from "../component/Rightbar";
import Newsvideo from "../component/Newsvideo";
import { FcNext } from "react-icons/fc";

const Home = () => {
  const [news, setNews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // ── fetch functions remain the same ──

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch news
  const fetchNews = async (categoryId = null, query = "", pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
      let url = `${API_BASE_URL}/news?page=${pageNum}&limit=20&status=PUBLISHED`;

      if (query) {
        url += `&search=${encodeURIComponent(query)}`;
      } else if (categoryId) {
        url += `&category=${categoryId}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setNews(data.news || []);
        setTotalPages(data.totalPages || 1);
        setPage(pageNum);
      } else {
        setError(data.message || "Failed to fetch news");
      }
    } catch (err) {
      setError(
        "Failed to connect to server. Please make sure the backend is running.",
      );
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/videos?limit=4&type=Shorts`,
      );
      const data = await response.json();
      if (response.ok) {
        setVideos(data.videos || []);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  // Handle news click
  const handleNewsClick = (article) => {
    setSelectedNews(article);
    navigate(`/news/${article._id || article.id}`);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchNews(selectedCategory, searchQuery, newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNews();
    fetchVideos();
  }, []);

  console.log(videos, "news datas");

  useEffect(() => {
    fetchCategories();
    fetchNews();
    fetchVideos();
  }, []);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-gray-50" // slightly softer bg
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {loading ? (
          <div className="flex items-center justify-center py-24 md:py-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading news...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => fetchNews(selectedCategory, searchQuery)}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 text-base font-medium"
            >
              Retry
            </button>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-700 text-lg">No articles found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6 xl:gap-8">
              {/* ─────────────── Main Content ─────────────── */}
              <div className="flex-1 order-2 lg:order-1">
                {/* Top Stories */}
                <div className="mb-10 md:mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold mb-5 border-b-3 border-orange-500 inline-block pb-1">
                    Top Stories
                  </h2>

                  <div className="space-y-6 md:space-y-8">
                    {news[0] && (
                      <NewsBox
                        news={news[0]}
                        size="large"
                        onClick={() => handleNewsClick(news[0])}
                      />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                      {news.slice(1, 3).map((article, index) => (
                        <NewsBox
                          key={article._id || index}
                          news={article}
                          size="medium"
                          onClick={() => handleNewsClick(article)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subscription Banner – better mobile stacking */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl p-5 md:p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-md">
                  <div className="text-center sm:text-left">
                    <p className="text-base sm:text-lg font-semibold leading-tight">
                      GET THE YEAR-END OFFER
                      <br />
                      <span className="text-xl sm:text-2xl font-bold">
                        3 years of TheNews for Rs. 10,000
                      </span>
                    </p>
                  </div>
                  <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-7 sm:px-8 rounded-lg transition-colors whitespace-nowrap text-base sm:text-lg shadow-sm">
                    Subscribe Now
                  </button>
                </div>

                {/* Other Categories */}
                {/* {categories?.slice(1)?.map((cat) => (
                  <section key={cat._id} className="mb-12 md:mb-16">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-gray-50 px-5 sm:px-6 py-4 flex items-center gap-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                          {cat.name}
                        </h2>
                        <div className="flex-1 h-1 bg-red-600"></div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 p-5 sm:p-6">
                        {news.filter((ele) => ele.category?.name === cat.name)
                          .length === 0 ? (
                          <p className="col-span-full text-center text-gray-500 py-8">
                            No articles yet
                          </p>
                        ) : (
                          news
                            .filter((ele) => ele.category?.name === cat.name)
                            .map((article) => (
                              <NewsBox
                                key={article._id || article.id}
                                news={article}
                                onClick={() => handleNewsClick(article)}
                              />
                            ))
                        )}
                      </div>
                    </div>
                  </section>
                ))} */}

                {/* Remaining news (if many) */}
                {/* {news.length > 11 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
                    {news.slice(11).map((article) => (
                      <NewsBox
                        key={article._id || article.id}
                        news={article}
                        onClick={() => handleNewsClick(article)}
                      />
                    ))}
                  </div>
                )} */}

                {/* Pagination – more touch-friendly */}
                {/* {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-8 md:mt-10">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="px-5 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base min-w-[80px]"
                    >
                      Previous
                    </button>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-4 py-2 rounded-lg text-sm sm:text-base min-w-[40px] ${
                            page === i + 1
                              ? "bg-orange-600 text-white font-medium"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className="px-5 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base min-w-[80px]"
                    >
                      Next
                    </button>
                  </div>
                )} */}
              </div>

              {/* ─────────────── Sidebar ─────────────── */}
              <aside className="lg:w-80 xl:w-96 order-1 lg:order-2 mb-8 lg:mb-0 lg:sticky lg:top-4 lg:self-start">
                <Rightbar />
              </aside>
            </div>

            {/* Categories – first one highlighted */}
            {categories?.slice(0, 1)?.map((cat) => {
              const filteredNews = news
                .filter((ele) => ele.category?.name === cat.name)
                .slice(0, 4); // show 6 in row

              return (
                <section key={cat._id} className="mb-12 md:mb-16 max-w-7xl">
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="bg-gray-50 px-5 sm:px-6 py-4 flex items-center gap-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {cat.name}
                      </h2>
                      <div className="flex-1 h-1 bg-red-600"></div>
                    </div>

                    {/* Row Layout */}
                    <div className="flex gap-6 overflow-x-auto p-5 sm:p-6 scrollbar-hide">
                      {filteredNews.length === 0 ? (
                        <p className="text-center text-gray-500 py-8 w-full">
                          No articles in this category yet
                        </p>
                      ) : (
                        <>
                          {filteredNews.map((article) => (
                            <div
                              key={article._id || article.id}
                              className="min-w-[20rem] "
                            >
                              <NewsBox
                                news={article}
                                onClick={() => handleNewsClick(article)}
                              />
                            </div>
                          ))}

                          {/* More Button */}
                          <div className="min-w-[200px] flex items-center justify-center">
                            <button
                              onClick={() => navigate(`/category/${cat._id}`)}
                              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex gap-2 items-center"
                            >
                              More <FcNext/>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </section>
              );
            })}


            {/* Shorts / Videos */}
            {videos.length > 0 && (
              <section className="mb-12 md:mb-16 max-w-7xl">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-5 sm:px-6 py-4 flex items-center gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      Shorts
                    </h2>
                    <div className="flex-1 h-1 bg-red-600"></div>
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 p-5 sm:p-6">
                    {videos.map((video) => (
                      <Newsvideo key={video._id || video.id} video={video} />
                    ))}
                  </div>
                </div>
              </section>
            )}


            {categories?.slice(1)?.map((cat) => {
              const filteredNews = news
                .filter((ele) => ele.category?.name === cat.name)
                .slice(0, 4); // show 6 in row

              return (
                <section key={cat._id} className="mb-12 md:mb-16 max-w-7xl">
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="bg-gray-50 px-5 sm:px-6 py-4 flex items-center gap-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {cat.name}
                      </h2>
                      <div className="flex-1 h-1 bg-red-600"></div>
                    </div>

                    {/* Row Layout */}
                    <div className="flex gap-6 overflow-x-auto p-5 sm:p-6 scrollbar-hide">
                      {filteredNews.length === 0 ? (
                        <p className="text-center text-gray-500 py-8 w-full">
                          No articles in this category yet
                        </p>
                      ) : (
                        <>
                          {filteredNews.map((article) => (
                            <div
                              key={article._id || article.id}
                              className="max-w-[20rem] "
                            >
                              <NewsBox
                                news={article}
                                onClick={() => handleNewsClick(article)}
                              />
                            </div>
                          ))}

                          {/* More Button */}
                          {filteredNews.length > 2 && 
                          <div className="min-w-[200px] flex items-center justify-center">
                            <button
                              onClick={() => navigate(`/category/${cat._id}`)}
                              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                              More →
                            </button>
                          </div>}
                        </>
                      )}
                    </div>
                  </div>
                </section>
              );
            })}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
