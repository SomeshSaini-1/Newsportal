

// import { useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import NewsBox from "../component/Newsbox";
// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// import { Rightbar } from "../component/Rightbar";
// import Newsvideo from "../component/Newsvideo";
// import { FcNext } from "react-icons/fc";

// /* ─────────────── Animation Variants ─────────────── */
// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   visible: (i = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// const staggerContainer = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
// };

// /* ─────────────── Section Header ─────────────── */
// const SectionHeader = ({ title, onMore, catId }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex items-center justify-between mb-0 px-5 sm:px-6 py-4 bg-gray-50 border-b border-gray-100">
//       <div className="flex items-center gap-3">
//         <span className="block w-1 h-6 rounded-full bg-red-600" />
//         <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
//           {title}
//         </h2>
//       </div>
//       {catId && (
//         <button
//           onClick={() => navigate(`/category/${catId}`)}
//           className="group flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
//         >
//           See all
//           <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
//         </button>
//       )}
//     </div>
//   );
// };

// /* ─────────────── Skeleton Loader ─────────────── */
// const SkeletonCard = ({ large }) => (
//   <div
//     className={`bg-white rounded-xl overflow-hidden animate-pulse shadow-sm border border-gray-100 ${large ? "col-span-2 row-span-2" : ""
//       }`}
//   >
//     <div className={`bg-gray-200 w-full ${large ? "h-72" : "h-44"}`} />
//     <div className="p-4 space-y-2.5">
//       <div className="h-3 bg-gray-200 rounded w-1/4" />
//       <div className="h-4 bg-gray-200 rounded w-3/4" />
//       <div className="h-3 bg-gray-200 rounded w-full" />
//       <div className="h-3 bg-gray-200 rounded w-2/3" />
//     </div>
//   </div>
// );

// /* ─────────────── Breaking Ticker ─────────────── */
// const BreakingTicker = ({ items }) => {
//   if (!items?.length) return null;
//   const doubled = [...items, ...items]; // seamless loop
//   return (
//     <div className="bg-orange-600 text-white overflow-hidden flex items-stretch rounded-xl mb-8 shadow-md">
//       <div className="bg-red-700 px-4 py-2.5 flex items-center gap-2 shrink-0 z-10">
//         <span className="relative flex h-2.5 w-2.5">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75" />
//           <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400" />
//         </span>
//         <span className="font-black text-sm tracking-widest uppercase whitespace-nowrap">
//           Breaking
//         </span>
//       </div>
//       <div className="overflow-hidden flex-1 py-2.5">
//         <motion.div
//           className="flex gap-16 whitespace-nowrap"
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
//         >
//           {doubled.map((item, i) => (
//             <span key={i} className="text-sm font-medium">
//               {item.title || item}
//               <span className="mx-8 opacity-50">◆</span>
//             </span>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// /* ─────────────── Category Pill Filter ─────────────── */
// const CategoryPills = ({ categories, selected, onSelect }) => (

//   <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
//     <div className="mb-4">
//       <h3 className="text-base font-bold text-gray-900">Categories</h3>
//       <p className="text-sm text-gray-500 mt-1">Browse news by topic</p>
//     </div>

//     <div className="flex flex-col gap-2 overflow-y-auto pr-1">
//       <button
//         onClick={() => onSelect(null)}
//         className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${selected === null
//           ? "bg-orange-600 text-white border-orange-600 shadow-md"
//           : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
//           }`}
//       >
//         All News
//       </button>

//       {categories.map((cat) => (
//         <button
//           key={cat._id}
//           onClick={() => onSelect(cat._id)}
//           className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${selected === cat._id
//             ? "bg-orange-600 text-white border-orange-600 shadow-md"
//             : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
//             }`}
//         >
//           {cat.name}
//         </button>
//       ))}
//     </div>
//   </div>
// );

// /* ─────────────── Hero Feature Card ─────────────── */
// const HeroCard = ({ article, onClick }) => {
//   if (!article) return null;
//   const img = `${import.meta.env.VITE_IMG_URL}${article.thumbnail}`;
//   console.log(img, "hero image");
//   const cat = article.category?.name;
//   const date = article.createdAt
//     ? new Date(article.createdAt).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     })
//     : "";

//   return (
//     <motion.div
//       variants={fadeUp}
//       custom={0}
//       onClick={onClick}
//       className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-100"
//       style={{ minHeight: 380 }}
//     >
//       {/* Image */}
//       {img ? (
//         <img
//           src={img}
//           alt={article.title}
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//         />
//       ) : (
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700" />
//       )}

//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//       {/* Badges */}
//       <div className="absolute top-4 left-4 flex gap-2">
//         {cat && (
//           <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow">
//             {cat}
//           </span>
//         )}
//         <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
//           {date}
//         </span>
//       </div>

//       {/* Content */}
//       <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
//         <h2 className="text-white font-black text-xl sm:text-2xl md:text-3xl leading-snug mb-2 group-hover:text-orange-200 transition-colors line-clamp-3">
//           {article.title}
//         </h2>
//         {article.excerpt && (
//           <p className="text-gray-300 text-sm line-clamp-2 mb-3">
//             {article.excerpt}
//           </p>
//         )}
//         <span className="inline-flex items-center gap-1.5 text-orange-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
//           Read story <span>→</span>
//         </span>
//       </div>
//     </motion.div>
//   );
// };

// /* ─────────────── Small Article Row ─────────────── */
// const SmallArticleRow = ({ article, onClick, index }) => {
//   const img = `${import.meta.env.VITE_IMG_URL}${article.thumbnail}`;
//   return (
//     <motion.div
//       variants={fadeUp}
//       custom={index}
//       onClick={onClick}
//       className="group flex gap-4 cursor-pointer py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
//     >
//       {img && (
//         <div className="shrink-0 w-20 h-16 rounded-lg overflow-hidden bg-gray-100">
//           <img
//             src={img}
//             alt={article.title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//       )}
//       <div className="flex-1 min-w-0">
//         {article.category?.name && (
//           <span className="text-orange-600 text-[11px] font-bold uppercase tracking-wide">
//             {article.category.name}
//           </span>
//         )}
//         <p className="text-gray-800 font-semibold text-sm leading-snug line-clamp-2 mt-0.5 group-hover:text-orange-700 transition-colors">
//           {article.title}
//         </p>
//         {article.createdAt && (
//           <span className="text-gray-400 text-xs mt-1 block">
//             {new Date(article.createdAt).toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             })}
//           </span>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// /* ─────────────── Subscription Banner ─────────────── */
// const SubscriptionBanner = () => (
//   <motion.div
//     variants={fadeUp}
//     className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white rounded-2xl p-6 md:p-8 mb-10 shadow-xl"
//   >
//     {/* Decorative circle */}
//     <div className="absolute -right-12 -top-12 w-52 h-52 bg-white/5 rounded-full" />
//     <div className="absolute -right-4 -bottom-16 w-72 h-72 bg-yellow-400/10 rounded-full" />

//     <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
//       <div className="text-center sm:text-left">
//         <p className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-1.5">
//           🎉 Year-End Offer
//         </p>
//         <p className="text-2xl sm:text-3xl font-black leading-tight">
//           3 Years of TheNews
//         </p>
//         <p className="text-blue-200 mt-1 text-sm sm:text-base">
//           for just{" "}
//           <span className="text-yellow-300 font-extrabold text-lg">
//             Rs. 10,000
//           </span>
//         </p>
//       </div>
//       <div className="text-center">
//         <button className="group relative bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black py-3.5 px-9 rounded-xl transition-all duration-200 text-base shadow-lg hover:shadow-yellow-400/40 hover:-translate-y-0.5">
//           Subscribe Now
//           <span className="ml-2 group-hover:ml-3 transition-all">→</span>
//         </button>
//         <p className="text-blue-300 text-xs mt-2">Cancel anytime. No lock-in.</p>
//       </div>
//     </div>
//   </motion.div>
// );

// /* ─────────────── Horizontal Category Strip ─────────────── */
// const CategoryStrip = ({ cat, news, navigate, handleNewsClick }) => {
//   const filteredNews = news
//     .filter((ele) => ele.category?.name === cat.name)
//     .slice(0, 4);

//   return (
//     <motion.section
//       variants={fadeUp}
//       className="mb-10 md:mb-14 max-w-7xl"
//     >
//       <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
//         <SectionHeader title={cat.name} catId={cat._id} />

//         <div className="flex gap-5 overflow-x-auto p-5 sm:p-6 scrollbar-hide snap-x">
//           {filteredNews.length === 0 ? (
//             <p className="text-center text-gray-400 py-8 w-full text-sm">
//               No articles in this category yet
//             </p>
//           ) : (
//             <>
//               {filteredNews.map((article) => (
//                 <div
//                   key={article._id || article.id}
//                   className="min-w-[15rem] max-w-[15rem] snap-start"
//                 >
//                   <NewsBox
//                     news={article}
//                     onClick={() => handleNewsClick(article)}
//                   />
//                 </div>
//               ))}

//               {filteredNews.length > 2 && (
//                 <div className="min-w-[140px] flex items-center justify-center shrink-0">
//                   <button
//                     onClick={() => navigate(`/category/${cat._id}`)}
//                     className="group flex flex-col items-center gap-2 text-gray-500 hover:text-red-600 transition-colors"
//                   >
//                     <span className="w-12 h-12 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
//                       <FcNext className="text-xl" />
//                     </span>
//                     <span className="text-xs font-semibold">View More</span>
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// /* ─────────────── Main Home Component ─────────────── */
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
//   const { scrollY } = useScroll();
//   const heroOpacity = useTransform(scrollY, [0, 200], [1, 0.6]);

//   const API_BASE_URL = import.meta.env.VITE_API_URL;

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/categories`);
//       const data = await response.json();
//       setCategories(data);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   const fetchNews = async (categoryId = null, query = "", pageNum = 1) => {
//     setLoading(true);
//     setError(null);
//     try {
//       let url = `${API_BASE_URL}/news?page=${pageNum}&limit=50&status=PUBLISHED`;
//       if (query) url += `&search=${encodeURIComponent(query)}`;
//       else if (categoryId) url += `&category=${categoryId}`;
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
//       setError("Failed to connect to server. Please make sure the backend is running.");
//       console.error("Error fetching news:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/videos?limit=4`);
//       const data = await response.json();
//       if (response.ok) setVideos(data.videos || []);
//     } catch (err) {
//       console.error("Error fetching videos:", err);
//     }
//   };

//   const handleNewsClick = (article) => {
//     setSelectedNews(article);
//     navigate(`/news/${article._id || article.id}`);
//   };

//   const handleCategorySelect = (catId) => {
//     setSelectedCategory(catId);
//     fetchNews(catId, searchQuery);
//   };

//   /* ─── JS-based sticky for left sidebar (CSS sticky broken by overflow-x-hidden in Layout) ─── */
//   const sidebarRef = useRef(null);
//   const [sidebarStyle, setSidebarStyle] = useState({});

//   useEffect(() => {
//     const aside = sidebarRef.current;
//     if (!aside) return;

//     const TOP_OFFSET = 10; // top-24 = 6rem = 96px
//     let originalTop = aside.getBoundingClientRect().top + window.scrollY;

//     const handleScroll = () => {
//       if (window.scrollY + TOP_OFFSET >= originalTop) {
//         setSidebarStyle({
//           position: "fixed",
//           top: TOP_OFFSET,
//           width: aside.offsetWidth,
//         });
//       } else {
//         setSidebarStyle({});
//       }
//     };

//     const recalculate = () => {
//       // Temporarily remove fixed to measure true position
//       setSidebarStyle({});
//       requestAnimationFrame(() => {
//         originalTop = aside.getBoundingClientRect().top + window.scrollY;
//         handleScroll();
//       });
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     window.addEventListener("resize", recalculate);
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", recalculate);
//     };
//   }, [categories]);

//   useEffect(() => {
//     fetchCategories();
//     fetchNews();
//     fetchVideos();
//   }, []);

//   /* ─── Loading skeleton ─── */
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Ticker skeleton */}
//           <div className="h-10 bg-orange-100 rounded-xl mb-8 animate-pulse" />

//           <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6 xl:gap-8">
//             <div className="space-y-6">
//               <SkeletonCard large />
//               <div className="grid grid-cols-2 gap-5">
//                 <SkeletonCard /> <SkeletonCard />
//               </div>
//             </div>
//             <div className="space-y-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ─── Error state ─── */
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md mx-4">
//           <div className="text-red-500 text-5xl mb-4">⚠️</div>
//           <h3 className="text-xl font-bold text-gray-800 mb-2">
//             Couldn't load news
//           </h3>
//           <p className="text-gray-500 text-sm mb-6">{error}</p>
//           <button
//             onClick={() => fetchNews(selectedCategory, searchQuery)}
//             className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm"
//           >
//             Try again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ─── Empty state ─── */
//   if (news.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">📰</div>
//           <p className="text-gray-500 text-lg">No articles found</p>
//         </div>
//       </div>
//     );
//   }

//   return (

//     <motion.div
//       variants={staggerContainer}
//       initial="hidden"
//       animate="visible"
//       className="min-h-screen bg-gray-50"
//     >
//       <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
//         {/* ── Breaking News Ticker ── */}
//         <BreakingTicker items={news.slice(0, 8)} />

//         {/* Main page grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-[260px,minmax(0,1fr),360px] gap-6 xl:gap-8">

//           {/* ─────────── Left Sticky Category Sidebar ─────────── */}
//           <aside className="hidden lg:block" ref={sidebarRef}>
//             {categories.length > 0 && (
//               <div
//                 style={sidebarStyle}
//                 className="max-h-[calc(100vh-8rem)] overflow-y-auto"
//               >
//                 <CategoryPills
//                   categories={categories}
//                   selected={selectedCategory}
//                   onSelect={handleCategorySelect}
//                 />
//               </div>
//             )}
//           </aside>

//           {/* ─────────── Main Content ─────────── */}
//           <main className="min-w-0">
//             {/* Mobile category pills */}
//             {/* {categories.length > 0 && (
//           <div className="lg:hidden mb-6 ">
//             <CategoryPills
//               categories={categories}
//               selected={selectedCategory}
//               onSelect={handleCategorySelect}
//             />
//           </div>
//         )} */}

//             {/* Top Stories Header */}
//             <motion.div variants={fadeUp} className="mb-5">
//               <div className="flex items-center gap-3">
//                 <span className="block w-1 h-7 rounded-full bg-orange-500" />
//                 <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
//                   Top Stories
//                 </h2>
//               </div>
//             </motion.div>

//             {/* Hero Card */}
//             <motion.div
//               variants={fadeUp}
//               style={{ opacity: heroOpacity }}
//               className="my-6"
//             >
//               <HeroCard
//                 article={news[0]}
//                 onClick={() => handleNewsClick(news[0])}
//               />
//             </motion.div>

//             {/* Two medium cards */}
//             <motion.div
//               variants={staggerContainer}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10"
//             >
//               {news.slice(1, 3).map((article, index) => (
//                 <motion.div key={article._id || index} variants={fadeUp} custom={index + 1}>
//                   <NewsBox
//                     news={article}
//                     size="medium"
//                     onClick={() => handleNewsClick(article)}
//                   />
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Subscription Banner */}
//             <SubscriptionBanner />

//             {/* Latest News */}
//             {news.length > 3 && (
//               <motion.div variants={fadeUp} className="mb-10">
//                 <div className="flex items-center gap-3 mb-5">
//                   <span className="block w-1 h-6 rounded-full bg-orange-500" />
//                   <h2 className="text-xl font-black text-gray-900 tracking-tight">
//                     Latest News
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//                   {news.slice(3, 9).map((article, i) => (
//                     <motion.div key={article._id || i} variants={fadeUp} custom={i}>
//                       <NewsBox
//                         news={article}
//                         onClick={() => handleNewsClick(article)}
//                       />
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* First category strip */}
//             {categories?.slice(0, 1)?.map((cat) => (
//               <CategoryStrip
//                 key={cat._id}
//                 cat={cat}
//                 news={news}
//                 navigate={navigate}
//                 handleNewsClick={handleNewsClick}
//               />
//             ))}

//             {/* Videos / Shorts */}
//             {videos.length > 0 && (
//               <motion.section variants={fadeUp} className="mb-10 md:mb-14">
//                 <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
//                   <div className="bg-gray-50 px-5 sm:px-6 py-4 flex items-center gap-4 border-b border-gray-100">
//                     <span className="w-1 h-6 rounded-full bg-red-600 block" />
//                     <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
//                       Shorts
//                     </h2>
//                     <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
//                       Live
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 p-5 sm:p-6">
//                     {videos.map((video, i) => (
//                       <motion.div key={video._id || video.id} variants={fadeUp} custom={i}>
//                         <Newsvideo video={video} />
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.section>
//             )}

//             {/* Remaining category strips */}
//             {categories?.slice(1)?.map((cat) => (
//               <CategoryStrip
//                 key={cat._id}
//                 cat={cat}
//                 news={news}
//                 navigate={navigate}
//                 handleNewsClick={handleNewsClick}
//               />
//             ))}

//             {/* Back to top */}
//             <div className="flex justify-center mt-4 mb-10">
//               <button
//                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                 className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-orange-600 transition-colors"
//               >
//                 <span className="w-8 h-8 rounded-full border border-gray-200 group-hover:border-orange-400 flex items-center justify-center group-hover:bg-orange-50 transition-all">
//                   ↑
//                 </span>
//                 Back to top
//               </button>
//             </div>
//           </main>

//           {/* ─────────── Right Sidebar ─────────── */}
//           <aside className="min-w-0 lg:self-start">
//             {news.length > 9 && (
//               <motion.div
//                 variants={fadeUp}
//                 className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6"
//               >
//                 <div className="flex items-center gap-2.5 mb-4">
//                   <span className="w-1 h-5 bg-red-600 rounded-full block" />
//                   <h3 className="font-black text-gray-800 text-base tracking-tight">
//                     More Headlines
//                   </h3>
//                 </div>

//                 <motion.div variants={staggerContainer}>
//                   {news.slice(9, 14).map((article, i) => (
//                     <SmallArticleRow
//                       key={article._id || i}
//                       article={article}
//                       onClick={() => handleNewsClick(article)}
//                       index={i}
//                     />
//                   ))}
//                 </motion.div>
//               </motion.div>
//             )}

//             <div className="lg:sticky lg:top-24">
//               <Rightbar />
//             </div>
//           </aside>
//         </div>
//       </div>
//     </motion.div>

//   );
// };

// export default Home;









import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import NewsBox from "../component/Newsbox";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Newsvideo from "../component/Newsvideo";
import { FcNext } from "react-icons/fc";

/* ─────────────── Animation Variants ─────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/* ─────────────── Section Header ─────────────── */
const SectionHeader = ({ title, onMore, catId }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mb-0 px-5 sm:px-6 py-4 bg-gray-50 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <span className="block w-1 h-6 rounded-full bg-red-600" />
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h2>
      </div>
      {catId && (
        <button
          onClick={() => navigate(`/category/${catId}`)}
          className="group flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
        >
          See all
          <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
        </button>
      )}
    </div>
  );
};

/* ─────────────── Skeleton Loader ─────────────── */
const SkeletonCard = ({ large }) => (
  <div
    className={`bg-white rounded-xl overflow-hidden animate-pulse shadow-sm border border-gray-100 ${large ? "col-span-2 row-span-2" : ""
      }`}
  >
    <div className={`bg-gray-200 w-full ${large ? "h-72" : "h-44"}`} />
    <div className="p-4 space-y-2.5">
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

/* ─────────────── Breaking Ticker ─────────────── */
const BreakingTicker = ({ items }) => {
  if (!items?.length) return null;
  const doubled = [...items, ...items]; // seamless loop
  return (
    <div className="bg-orange-600 text-white overflow-hidden flex items-stretch rounded-xl mb-8 shadow-md">
      <div className="bg-red-700 px-4 py-2.5 flex items-center gap-2 shrink-0 z-10">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400" />
        </span>
        <span className="font-black text-sm tracking-widest uppercase whitespace-nowrap">
          Breaking
        </span>
      </div>
      <div className="overflow-hidden flex-1 py-2.5">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="text-sm font-medium">
              <span className="mx-2 opacity-50">◆</span>
              {item.title || item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* ─────────────── Category Pill Filter (with article preview) ─────────────── */
const CategoryPills = ({ categories, selected, onSelect, news = [], onArticleClick }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900">Categories</h3>
        <p className="text-sm text-gray-500 mt-1">Browse news by topic</p>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto pr-1">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${selected === null
            ? "bg-orange-600 text-white border-orange-600 shadow-md"
            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
            }`}
        >
          All News
        </button>

        {categories.map((cat) => {
          // Find one article for this category
          const article = news.find((n) => n.category?._id === cat._id || n.category?.name === cat.name);

          return (
            <div key={cat._id} className="flex flex-col">
              <button
                onClick={() => onSelect(cat._id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${selected === cat._id
                  ? "bg-orange-600 text-white border-orange-600 shadow-md"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
                  }`}
              >
                {cat.name}
              </button>

              {/* One article preview */}
              {article && (
                <div
                  onClick={() => onArticleClick?.(article)}
                  className="mt-2 mx-1 mb-1 flex gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {article.thumbnail && (
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${article.thumbnail}`}
                      alt={article.title}
                      className="w-14 h-12 rounded-md object-cover shrink-0 bg-gray-100"
                    />
                  )}
                  <p className="text-xs text-gray-700 font-medium leading-tight line-clamp-2">
                    {article.title}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────── Hero Feature Card ─────────────── */
const HeroCard = ({ article, onClick }) => {
  if (!article) return null;
  const img = `${import.meta.env.VITE_IMG_URL}${article.thumbnail}`;
  console.log(img, "hero image");
  const cat = article.category?.name;
  const date = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    : "";

  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-100"
      style={{ minHeight: 380 }}
    >
      {/* Image */}
      {img ? (
        <img
          src={img}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        {cat && (
          <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow">
            {cat}
          </span>
        )}
        <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {date}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
        <h2 className="text-white font-black text-xl sm:text-2xl md:text-3xl leading-snug mb-2 group-hover:text-orange-200 transition-colors line-clamp-3">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">
            {article.excerpt}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 text-orange-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
          Read story <span>→</span>
        </span>
      </div>
    </motion.div>
  );
};

/* ─────────────── Small Article Row ─────────────── */
const SmallArticleRow = ({ article, onClick, index }) => {
  const img = `${import.meta.env.VITE_IMG_URL}${article.thumbnail}`;
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onClick={onClick}
      className="group flex gap-4 cursor-pointer py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
    >
      {img && (
        <div className="shrink-0 w-20 h-16 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={img}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        {article.category?.hi_name && (
          <span className="text-orange-600 text-[11px] font-bold uppercase tracking-wide">
            {article.category.hi_name}
          </span>
        )}
        <p className="text-gray-800 font-semibold text-sm leading-snug line-clamp-2 mt-0.5 group-hover:text-orange-700 transition-colors">
          {article.title}
        </p>
        {article.createdAt && (
          <span className="text-gray-400 text-xs mt-1 block">
            {new Date(article.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────── Subscription Banner ─────────────── */
const SubscriptionBanner = () => (
  <motion.div
    variants={fadeUp}
    className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white rounded-2xl p-6 md:p-8 mb-10 shadow-xl"
  >
    {/* Decorative circle */}
    <div className="absolute -right-12 -top-12 w-52 h-52 bg-white/5 rounded-full" />
    <div className="absolute -right-4 -bottom-16 w-72 h-72 bg-yellow-400/10 rounded-full" />

    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="text-center sm:text-left">
        <p className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-1.5">
          🎉 Year-End Offer
        </p>
        <p className="text-2xl sm:text-3xl font-black leading-tight">
          3 Years of TheNews
        </p>
        <p className="text-blue-200 mt-1 text-sm sm:text-base">
          for just{" "}
          <span className="text-yellow-300 font-extrabold text-lg">
            Rs. 10,000
          </span>
        </p>
      </div>
      <div className="text-center">
        <button className="group relative bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black py-3.5 px-9 rounded-xl transition-all duration-200 text-base shadow-lg hover:shadow-yellow-400/40 hover:-translate-y-0.5">
          Subscribe Now
          <span className="ml-2 group-hover:ml-3 transition-all">→</span>
        </button>
        <p className="text-blue-300 text-xs mt-2">Cancel anytime. No lock-in.</p>
      </div>
    </div>
  </motion.div>
);

/* ─────────────── Horizontal Category Strip ─────────────── */
const CategoryStrip = ({ cat, news, navigate, handleNewsClick }) => {
  const filteredNews = news
    .filter((ele) => ele.category?.name === cat.name)
    .slice(0, 4);

  return (
    <motion.section
      variants={fadeUp}
      className="mb-10 md:mb-14 max-w-7xl"
    >
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <SectionHeader title={cat.name} catId={cat._id} />

        <div className="flex gap-5 overflow-x-auto p-5 sm:p-6 scrollbar-hide snap-x">
          {filteredNews.length === 0 ? (
            <p className="text-center text-gray-400 py-8 w-full text-sm">
              No articles in this category yet
            </p>
          ) : (
            <>
              {filteredNews.map((article) => (
                <div
                  key={article._id || article.id}
                  className="min-w-[15rem] max-w-[15rem] snap-start"
                >
                  <NewsBox
                    news={article}
                    onClick={() => handleNewsClick(article)}
                  />
                </div>
              ))}

              {filteredNews.length > 2 && (
                <div className="min-w-[140px] flex items-center justify-center shrink-0">
                  <button
                    onClick={() => navigate(`/category/${cat._id}`)}
                    className="group flex flex-col items-center gap-2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <span className="w-12 h-12 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                      <FcNext className="text-xl" />
                    </span>
                    <span className="text-xs font-semibold">View More</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
};

/* ─────────────── Main Home Component ─────────────── */
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
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0.6]);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchNews = async (categoryId = null, query = "", pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_BASE_URL}/hindinews?page=${pageNum}&limit=50&status=PUBLISHED`;
      if (query) url += `&search=${encodeURIComponent(query)}`;
      else if (categoryId) url += `&category=${categoryId}`;
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
      setError("Failed to connect to server. Please make sure the backend is running.");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos?limit=4`);
      const data = await response.json();
      if (response.ok) setVideos(data.videos || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const handleNewsClick = (article) => {
    setSelectedNews(article);
    navigate(`/news/${article._id || article.id}`);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    fetchNews(catId, searchQuery);
  };

  /* ─── JS-based sticky for left sidebar (CSS sticky broken by overflow-x-hidden in Layout) ─── */
  const sidebarRef = useRef(null);
  const [sidebarStyle, setSidebarStyle] = useState({});

  useEffect(() => {
    const aside = sidebarRef.current;
    if (!aside) return;

    const TOP_OFFSET = 10; // top-24 = 6rem = 96px
    let originalTop = aside.getBoundingClientRect().top + window.scrollY;

    const handleScroll = () => {
      if (window.scrollY + TOP_OFFSET >= originalTop) {
        setSidebarStyle({
          position: "fixed",
          top: TOP_OFFSET,
          width: aside.offsetWidth,
        });
      } else {
        setSidebarStyle({});
      }
    };

    const recalculate = () => {
      // Temporarily remove fixed to measure true position
      setSidebarStyle({});
      requestAnimationFrame(() => {
        originalTop = aside.getBoundingClientRect().top + window.scrollY;
        handleScroll();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", recalculate);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", recalculate);
    };
  }, [categories]);

  useEffect(() => {
    fetchCategories();
    fetchNews();
    fetchVideos();
  }, []);

  /* ─── Loading skeleton ─── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Ticker skeleton */}
          <div className="h-10 bg-orange-100 rounded-xl mb-8 animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6 xl:gap-8">
            <div className="space-y-6">
              <SkeletonCard large />
              <div className="grid grid-cols-2 gap-5">
                <SkeletonCard /> <SkeletonCard />
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Error state ─── */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md mx-4">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Couldn't load news
          </h3>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => fetchNews(selectedCategory, searchQuery)}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  /* ─── Empty state ─── */
  if (news.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <p className="text-gray-500 text-lg">No articles found</p>
        </div>
      </div>
    );
  }

  return (

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* ── Breaking News Ticker ── */}
        <BreakingTicker items={news.slice(0, 8)} />

        {/* Main page grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px,minmax(0,1fr)] gap-6 xl:gap-8">

          {/* ─────────── Left Sticky Category Sidebar ─────────── */}
          <aside className="hidden lg:block" ref={sidebarRef}>
            {categories.length > 0 && (
              <div
                style={sidebarStyle}
                className="max-h-[calc(100vh-8rem)] overflow-y-auto"
              >
                <CategoryPills
                  categories={categories}
                  selected={selectedCategory}
                  onSelect={handleCategorySelect}
                  news={news}
                  onArticleClick={handleNewsClick}
                />
              </div>
            )}
          </aside>

          {/* ─────────── Main Content ─────────── */}
          <main className="min-w-0">
            {/* Mobile category pills */}
            {/* {categories.length > 0 && (
          <div className="lg:hidden mb-6 ">
            <CategoryPills
              categories={categories}
              selected={selectedCategory}
              onSelect={handleCategorySelect}
            />
          </div>
        )} */}

            {/* Top Stories Header */}
            <motion.div variants={fadeUp} className="mb-5">
              <div className="flex items-center gap-3">
                <span className="block w-1 h-7 rounded-full bg-orange-500" />
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                  मुख्य समाचार
                </h2>
              </div>
            </motion.div>

            {/* Hero Card */}
            <motion.div
              variants={fadeUp}
              style={{ opacity: heroOpacity }}
              className="my-6"
            >
              <HeroCard
                article={news[0]}
                onClick={() => handleNewsClick(news[0])}
              />
            </motion.div>

            {/* Two medium cards */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10"
            >
              {news.slice(1, 3).map((article, index) => (
                <motion.div key={article._id || index} variants={fadeUp} custom={index + 1}>
                  <NewsBox
                    news={article}
                    size="medium"
                    onClick={() => handleNewsClick(article)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Subscription Banner removed – main section is news-only */}

            {/* Latest News */}
            {news.length > 3 && (
              <motion.div variants={fadeUp} className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-1 h-6 rounded-full bg-orange-500" />
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">
                    महत्वपूर्ण समाचार
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {news.slice(3, 9).map((article, i) => (
                    <motion.div key={article._id || i} variants={fadeUp} custom={i}>
                      <NewsBox
                        news={article}
                        onClick={() => handleNewsClick(article)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* First category strip */}
            {categories?.slice(0, 1)?.map((cat) => (
              <CategoryStrip
                key={cat._id}
                cat={cat}
                news={news}
                navigate={navigate}
                handleNewsClick={handleNewsClick}
              />
            ))}

            {/* Videos / Shorts */}
            {videos.length > 0 && (
              <motion.section variants={fadeUp} className="mb-10 md:mb-14">
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-5 sm:px-6 py-4 flex items-center gap-4 border-b border-gray-100">
                    <span className="w-1 h-6 rounded-full bg-red-600 block" />
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                      Shorts
                    </h2>
                    <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                      Live
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 p-5 sm:p-6">
                    {videos.map((video, i) => (
                      <motion.div key={video._id || video.id} variants={fadeUp} custom={i}>
                        <Newsvideo video={video} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* Remaining category strips */}
            {categories?.slice(1)?.map((cat) => (
              <CategoryStrip
                key={cat._id}
                cat={cat}
                news={news}
                navigate={navigate}
                handleNewsClick={handleNewsClick}
              />
            ))}

            {/* Back to top */}
            <div className="flex justify-center mt-4 mb-10">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-orange-600 transition-colors"
              >
                <span className="w-8 h-8 rounded-full border border-gray-200 group-hover:border-orange-400 flex items-center justify-center group-hover:bg-orange-50 transition-all">
                  ↑
                </span>
                Back to top
              </button>
            </div>
          </main>
        </div>
      </div>
    </motion.div>

  );
};

export default Home;