// import React, { useRef, useEffect } from 'react';

// const trendingNews = [

//   {
//     title: "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
//     author: "Krishan Murari",
//     date: "December 30, 2025",
//     image: "https://i.ytimg.com/vi/2811QwoB7sc/hq720.jpg", // Protest march in Dehradun
//   },
//   {
//     title: "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
//     author: "Tina Das",
//     date: "December 30, 2025",
//     image: "https://i.redd.it/3w0hsc7madrd1.jpeg", // Vijay vs Prabhas collage/poster style
//   },
//   {
//     title: "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
//     author: "Krishan Murari",
//     date: "December 30, 2025",
//     image: "https://i.ytimg.com/vi/2811QwoB7sc/hq720.jpg", // Protest march in Dehradun
//   },
//   {
//     title: "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
//     author: "Tina Das",
//     date: "December 30, 2025",
//     image: "https://i.redd.it/3w0hsc7madrd1.jpeg", // Vijay vs Prabhas collage/poster style
//   },
//   {
//     title: "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
//     author: "Krishan Murari",
//     date: "December 30, 2025",
//     image: "https://i.ytimg.com/vi/2811QwoB7sc/hq720.jpg", // Protest march in Dehradun
//   },
//   {
//     title: "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
//     author: "Tina Das",
//     date: "December 30, 2025",
//     image: "https://i.redd.it/3w0hsc7madrd1.jpeg", // Vijay vs Prabhas collage/poster style
//   },
//   {
//     title: "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
//     author: "Krishan Murari",
//     date: "December 30, 2025",
//     image: "https://i.ytimg.com/vi/2811QwoB7sc/hq720.jpg", // Protest march in Dehradun
//   },
//   {
//     title: "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
//     author: "Tina Das",
//     date: "December 30, 2025",
//     image: "https://i.redd.it/3w0hsc7madrd1.jpeg", // Vijay vs Prabhas collage/poster style
//   }

// ];

// export const Rightbar = () => {
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     let animationId;
//     let scrollAmount = 0;
//     const speed = 0.5; // Adjust speed (higher = faster scroll)

//     const scroll = () => {
//       if (container) {
//         scrollAmount += speed;
//         container.scrollTop = scrollAmount;

//         // Seamless loop: reset to top when reaching bottom
//         if (scrollAmount >= container.scrollHeight - container.clientHeight) {
//           scrollAmount = 0;
//           container.scrollTop = 0;
//         }
//       }
//       animationId = requestAnimationFrame(scroll);
//     };

//     animationId = requestAnimationFrame(scroll);

//     // Pause on hover
//     const pause = () => cancelAnimationFrame(animationId);
//     const resume = () => (animationId = requestAnimationFrame(scroll));

//     container.addEventListener('mouseenter', pause);
//     container.addEventListener('mouseleave', resume);

//     return () => {
//       cancelAnimationFrame(animationId);
//       container.removeEventListener('mouseenter', pause);
//       container.removeEventListener('mouseleave', resume);
//     };
//   }, []);

  
//   // Fetch news
//   const fetchNews = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       let url = `${API_BASE_URL}/news?limit=20&status=PUBLISHED&trending=true`;


//       const response = await fetch(url);
//       const data = await response.json();

//       if (response.ok) {
//         setNews(data.news || []);
        
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


//   return (
//     <div className="lg:w-auto">
//       <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//         <h2 className="text-4xl font-bold text-orange-600 mb-4">Trending News</h2>
        
        
//         <div
//           ref={scrollRef}
//           className="h-[45rem] overflow-hidden hover:overflow-y-auto transition-all duration-300 space-y-6"
//         >
//           {trendingNews.map((item, index) => (
//             <div
//               key={index}
//               className="flex gap-4 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <div className="flex-shrink-0">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-32 h-24 object-cover rounded border-2 border-gray-300"
//                 />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-sm line-clamp-3">
//                   {item.title}
//                 </h4>
//                 <p className="text-xs text-gray-600 mt-1">
//                   {item.author} - {item.date}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
























import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const Rightbar = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending news
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `${API_BASE_URL}/news?limit=20&status=PUBLISHED&trending=true`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        // Duplicate the news array for seamless infinite scroll
        // const duplicatedNews = [...(data.news || []), ...(data.news || [])];
        setNews(data.news);
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

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || news.length === 0) return;

    let animationId;
    let scrollAmount = 0;
    const speed = 0.5; // Adjust speed (higher = faster scroll)

    const scroll = () => {
      if (container) {
        scrollAmount += speed;
        container.scrollTop = scrollAmount;

        // Seamless loop: reset to top when reaching halfway (since we duplicated the array)
        const halfHeight = container.scrollHeight / 2;
        if (scrollAmount >= halfHeight) {
          scrollAmount = 0;
          container.scrollTop = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => (animationId = requestAnimationFrame(scroll));

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
    };
  }, [news]);

  const handleArticleClick = (articleId) => {
    navigate(`/news/${articleId}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-red-600">
          Trending News
        </h2>
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-red-600">
          Trending News
        </h2>
        <div className="text-center py-6">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchNews}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-red-600">
          Trending News
        </h2>
        <div className="text-center py-6 text-gray-500">
          No trending news available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-red-600">
        Trending News
      </h2>
      <div
        ref={scrollRef}
        className="space-y-4 max-h-[600px] overflow-hidden"
      >
        {news.map((item, index) => (
          <div
            key={`${item._id}-${index}`}
            onClick={() => handleArticleClick(item._id)}
            className="flex gap-3 pb-4 border-b border-gray-200 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded"
          >
            <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
              {item.thumbnail ? (
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${item.thumbnail}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">
                {item.author || "News Desk"} - {new Date(item.publishedAt || item.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


