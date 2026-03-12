import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Details from './Pages/Details';
import Category from './Pages/Category';
import Videos from './Pages/Video';
import Enews from './Pages/Enews';
import Layout from './Layout';  // Import the new Layout
import Search from './Pages/Search';
import Enews_file  from './Pages/Enews_file';
import Terams  from './Pages/Terams';
import Privacy  from './Pages/Privacy';

const router = createBrowserRouter([
  {
    path: "/",  // Root layout route
    element: <Layout />,  // Wraps all children
    children: [
      {
        index: true,  
        element: <Home />,
      },
      {
        path: "news/:id", 
        element: <Details />,
      },
      {
        path: "videos",
        element: <Videos />
      },
      {
        path: "Terms",
        element: <Terams />
      },
      {
        path: "Privacy",
        element: <Privacy />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "Enews",
        element: <Enews />
      },
      {
        path: "category/:name/:id",  
        element: <Category />,
      },
      {
        path: "Enews/:id",
        element : <Enews_file />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;  // Just this – no manual <Nav /> or <Footer />
}

export default App;





// import React, { useState, useEffect } from 'react';
// import { Home, Instagram, Search, Youtube, Twitter, Facebook, Linkedin, Send } from 'lucide-react';

// // Navigation Component
// const Nav = ({ onCategoryClick, onSearch, categories }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const currentDate = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric'
//   });

//   const handleSearch = (e) => {
//     if (e.key === 'Enter' && searchQuery.trim()) {
//       onSearch(searchQuery);
//     }
//   };

//   return (
//     <div>
//       <div className="bg-black text-white py-2 px-4 md:px-8 flex flex-wrap items-center justify-between text-sm">
//         <div className="flex items-center space-x-3 sm:space-x-4">
//           {[Youtube, Twitter, Instagram, Facebook, Send, Linkedin].map((Icon, i) => (
//             <a 
//               key={i}
//               href="#" 
//               className="bg-red-600 hover:bg-red-700 p-1.5 rounded transition-colors"
//             >
//               <Icon className="h-4 w-4" />
//             </a>
//           ))}
//           <span className="ml-3 sm:ml-6 text-gray-400 hidden sm:inline">
//             {currentDate}
//           </span>
//         </div>  

//         <div className="flex items-center space-x-4 mt-2 md:mt-0">
//           <a 
//             href="#" 
//             className="text-gray-300 hover:text-white hover:underline text-xs sm:text-sm"
//           >
//             Preferred on Google
//           </a>
//           <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded font-bold text-sm transition-colors">
//             Support Us
//           </button>
//         </div>
//       </div>

//       <div className="text-center sm:text-left px-6 md:px-20 py-6 md:py-8 border-b border-gray-800">
//         <div 
//           onClick={() => onCategoryClick(null)}
//           className="text-5xl sm:text-6xl font-black text-orange-600 tracking-tighter cursor-pointer inline-block"
//         >
//           The News
//         </div>
//       </div>

//       <nav className="bg-black text-white border-b border-gray-800 z-50">
//         <div className="max-w-[1480px] mx-auto px-4 md:px-6">
//           <div className="flex items-center justify-between">
//             <div className="flex-1 overflow-x-auto no-scrollbar py-3.5">
//               <ul className="flex items-center whitespace-nowrap space-x-3 md:space-x-5 text-xs md:text-sm font-semibold uppercase tracking-wide">
//                 <li 
//                   className="cursor-pointer hover:text-orange-500 transition-colors"
//                   onClick={() => onCategoryClick(null)}
//                 >
//                   <Home size={18} />
//                 </li>

//                 {categories.map(cat => (
//                   <li
//                     key={cat._id}
//                     className="cursor-pointer hover:text-orange-500 transition-colors"
//                     onClick={() => onCategoryClick(cat._id)}
//                   >
//                     {cat.name}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="flex items-center bg-black h-full py-3.5 pl-4 md:pl-6 border-l border-gray-700">
//               <input
//                 type="text"
//                 placeholder="Search news..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyPress={handleSearch}
//                 className="bg-transparent border-b border-gray-600 focus:border-orange-500 outline-none px-2 py-1 w-32 md:w-40 lg:w-48 transition-all focus:w-64 text-sm"
//               />
//               <Search 
//                 className="ml-2 text-gray-400 hover:text-orange-500 cursor-pointer" 
//                 size={20}
//                 onClick={() => searchQuery.trim() && onSearch(searchQuery)}
//               />
//             </div>
//           </div>
//         </div>
//       </nav>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// };

// // Footer Component
// const Footer = () => {
//   return (
//     <footer className="w-full mt-12">
//       <div className="bg-black text-white py-4 px-6 text-center md:text-left">
//         <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm md:text-base">
//           <a href="#" className="hover:underline">TheNews Hindi</a>
//           <a href="#" className="hover:underline">TheNews English</a>
//           <a href="#" className="hover:underline">TheNews Speakers Bureau</a>
//           <a href="#" className="hover:underline">The School Of Journalism</a>
//         </div>
//       </div>

//       <div className="bg-orange-600 text-white py-5 px-6">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-4">
//           <div className="text-center md:text-left">
//             Copyright © 2025 Redsun Pvt. Ltd. All rights reserved.
//           </div>

//           <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
//             <a href="#" className="hover:underline">About</a>
//             <a href="#" className="hover:underline">Code Of Ethics</a>
//             <a href="#" className="hover:underline">Contact</a>
//             <a href="#" className="hover:underline">Terms of Use</a>
//             <a href="#" className="hover:underline">Privacy Policy</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// // News Card Component
// const NewsCard = ({ news, size = 'normal', onClick }) => {
//   const imageUrl = news.thumbnail || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
  
//   return (
//     <div className="group cursor-pointer" onClick={onClick}>
//       <div
//         className={`bg-gray-200 rounded-xl mb-4 bg-cover bg-center transition-transform group-hover:scale-[1.02] ${
//           size === 'large' ? 'h-96' : size === 'medium' ? 'h-48' : 'h-44'
//         }`}
//         style={{ backgroundImage: `url('${imageUrl}')` }}
//       />
//       <h3 className={`font-semibold leading-tight mb-2 group-hover:text-red-700 transition-colors line-clamp-2 ${
//         size === 'large' ? 'text-xl' : 'text-base'
//       }`}>
//         {news.title}
//       </h3>
//       <p className="text-sm text-gray-600 mb-2">
//         {news.category?.name || 'News'} - {new Date(news.createdAt).toLocaleDateString()}
//       </p>
//       {size === 'large' && news.shortDescription && (
//         <p className="text-gray-700 line-clamp-2">{news.shortDescription}</p>
//       )}
//     </div>
//   );
// };

// // Video Card Component
// const VideoCard = ({ video, onClick }) => {
//   const getYoutubeEmbedUrl = (url) => {
//     if (!url) return "";
//     const id = url.includes("watch?v=")
//       ? url.split("watch?v=")[1].split("&")[0]
//       : url.split("/").pop();
//     return `https://www.youtube.com/embed/${id}`;
//   };

//   return (
//     <div className="cursor-pointer" onClick={onClick}>
//       <div className="relative w-full h-44 mb-3 rounded-lg overflow-hidden">
//         <iframe
//           src={getYoutubeEmbedUrl(video.youtubeUrl)}
//           title={video.title}
//           className="absolute inset-0 w-full h-full"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         />
//       </div>
//       <h3 className="font-semibold text-gray-900 leading-snug mb-1 line-clamp-2 hover:text-red-600">
//         {video.title}
//       </h3>
//       <p className="text-sm text-gray-500 font-medium">
//         {video.category?.name || 'Video'} - {new Date(video.createdAt).toLocaleDateString()}
//       </p>
//     </div>
//   );
// };

// // News Detail Modal
// const NewsDetailModal = ({ news, onClose }) => {
//   if (!news) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
//       <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//         <div className="p-6">
//           <button
//             onClick={onClose}
//             className="float-right text-gray-500 hover:text-gray-700 text-2xl font-bold"
//           >
//             ×
//           </button>
          
//           {news.thumbnail && (
//             <img
//               src={news.thumbnail}
//               alt={news.title}
//               className="w-full h-96 object-cover rounded-lg mb-6"
//             />
//           )}
          
//           <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
          
//           <div className="flex items-center gap-4 text-gray-600 mb-6">
//             <span className="font-medium">{news.category?.name}</span>
//             <span>•</span>
//             <time>{new Date(news.createdAt).toLocaleDateString()}</time>
//             {news.state && (
//               <>
//                 <span>•</span>
//                 <span>{news.city}, {news.state}</span>
//               </>
//             )}
//           </div>
          
//           {news.shortDescription && (
//             <p className="text-xl text-gray-800 mb-6 leading-relaxed">
//               {news.shortDescription}
//             </p>
//           )}
          
//           <div className="prose prose-lg max-w-none text-gray-800">
//             <p className="whitespace-pre-wrap">{news.content}</p>
//           </div>
          
//           {news.tags && news.tags.length > 0 && (
//             <div className="mt-6 flex flex-wrap gap-2">
//               {news.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// export default function App() {
//   const [news, setNews] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [error, setError] = useState(null);
//   const [selectedNews, setSelectedNews] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const API_BASE_URL = 'http://localhost:5000/api';

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/categories`);
//       const data = await response.json();
//       setCategories(data);
//     } catch (err) {
//       console.error('Error fetching categories:', err);
//     }
//   };

//   // Fetch news
//   const fetchNews = async (categoryId = null, query = '', pageNum = 1) => {
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
//         setError(data.message || 'Failed to fetch news');
//       }
//     } catch (err) {
//       setError('Failed to connect to server. Please make sure the backend is running on http://localhost:5000');
//       console.error('Error fetching news:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch videos
//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/videos?limit=4`);
//       const data = await response.json();
//       if (response.ok) {
//         setVideos(data.videos || []);
//       }
//     } catch (err) {
//       console.error('Error fetching videos:', err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchNews();
//     fetchVideos();
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     setSelectedCategory(categoryId);
//     setSearchQuery('');
//     fetchNews(categoryId);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setSelectedCategory(null);
//     fetchNews(null, query);
//   };

//   const handleNewsClick = (newsItem) => {
//     setSelectedNews(newsItem);
//   };

//   const handlePageChange = (newPage) => {
//     fetchNews(selectedCategory, searchQuery, newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Nav 
//         onCategoryClick={handleCategoryClick} 
//         onSearch={handleSearch}
//         categories={categories}
//       />

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {searchQuery && (
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold">
//               Search Results for: <span className="text-orange-600">"{searchQuery}"</span>
//             </h2>
//             <button
//               onClick={() => {
//                 setSearchQuery('');
//                 fetchNews(selectedCategory);
//               }}
//               className="mt-2 text-sm text-blue-600 hover:underline"
//             >
//               ← Back to all news
//             </button>
//           </div>
//         )}

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
//             {/* Top Stories Section */}
//             <div className="mb-12">
//               <h2 className="text-2xl font-bold mb-4 border-b-2 border-orange-500 inline-block">
//                 Top Stories
//               </h2>

//               <div className="grid grid-cols-1 gap-6">
//                 {news[0] && (
//                   <div className="md:col-span-1 shadow-lg p-2">
//                     <NewsCard 
//                       news={news[0]} 
//                       size="large"
//                       onClick={() => handleNewsClick(news[0])}
//                     />
//                   </div>
//                 )}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {news.slice(1, 3).map((article, index) => (
//                     <NewsCard 
//                       key={index} 
//                       news={article} 
//                       size="medium"
//                       onClick={() => handleNewsClick(article)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Subscription Banner */}
//             <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="text-center sm:text-left">
//                 <p className="text-lg font-semibold leading-tight">
//                   GET THE YEAR-END OFFER
//                   <br />
//                   <span className="text-xl">3 years of TheNews for Rs. 10,000</span>
//                 </p>
//               </div>
//               <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded-md transition-colors whitespace-nowrap">
//                 Subscribe Now
//               </button>
//             </div>

//             {/* Latest News Grid */}
//             <div className="mb-12">
//               <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//                 <div className="bg-gray-50 px-6 py-4 flex items-center gap-4">
//                   <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
//                   <div className="flex-1 h-1 bg-red-700"></div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//                   {news.slice(3, 11).map((article, index) => (
//                     <NewsCard 
//                       key={index} 
//                       news={article}
//                       onClick={() => handleNewsClick(article)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Videos Section */}
//             {videos.length > 0 && (
//               <div className="mb-12">
//                 <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//                   <div className="bg-gray-50 px-6 py-4 flex items-center gap-4">
//                     <h2 className="text-2xl font-bold text-gray-800">Latest Videos</h2>
//                     <div className="flex-1 h-1 bg-red-700"></div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//                     {videos.map((video, index) => (
//                       <VideoCard key={index} video={video} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* More News */}
//             {news.length > 11 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                 {news.slice(11).map((article, index) => (
//                   <NewsCard 
//                     key={index} 
//                     news={article}
//                     onClick={() => handleNewsClick(article)}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center gap-2 mt-8">
//                 <button
//                   onClick={() => handlePageChange(page - 1)}
//                   disabled={page === 1}
//                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
                
//                 <div className="flex gap-2">
//                   {[...Array(totalPages)].map((_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => handlePageChange(i + 1)}
//                       className={`px-4 py-2 rounded ${
//                         page === i + 1
//                           ? 'bg-orange-600 text-white'
//                           : 'bg-gray-200 hover:bg-gray-300'
//                       }`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(page + 1)}
//                   disabled={page === totalPages}
//                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       <Footer />

//       {/* News Detail Modal */}
//       {selectedNews && (
//         <NewsDetailModal
//           news={selectedNews}
//           onClose={() => setSelectedNews(null)}
//         />
//       )}
//     </div>
//   );
// }