// // // src/pages/Videos.jsx
// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // import { Play, Clock, Eye } from "lucide-react";

// // const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // const Videos = () => {
// //   const [videos, setVideos] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   // Track the ID of the specific video being played
// //   const [playingVideoId, setPlayingVideoId] = useState(null);
// //   const [selectedCategory, setSelectedCategory] = useState("all");

// //   const fetchVideos = async () => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       let url = `${API_BASE_URL}/videos?status=PUBLISHED&limit=50`;
// //       if (selectedCategory !== "all") {
// //         url += `&category=${selectedCategory}`;
// //       }

// //       const response = await fetch(url);
// //       const data = await response.json();

// //       if (response.ok) {
// //         setVideos(data.videos || []);
// //       } else {
// //         setError(data.message || "Failed to fetch videos");
// //       }
// //     } catch (err) {
// //       setError("Failed to connect to server. Please try again.");
// //       console.error("Error fetching videos:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchVideos();
// //   }, [selectedCategory]);

// // //   const getYoutubeEmbedUrl = (url) => {
// // //     if (!url) return "";
// // //     let videoId = "";

// // //     if (url.includes("watch?v=")) {
// // //       videoId = url.split("watch?v=")[1].split("&")[0];
// // //     } else if (url.includes("youtu.be/")) {
// // //       videoId = url.split("youtu.be/")[1];
// // //     } else {
// // //       videoId = url.split("/").pop();
// // //     }

// // //     return `https://www.youtube.com{videoId}?autoplay=1&rel=0`;
// // //   };


// //   const getYoutubeEmbedUrl = (url) => {
// //     if (!url) return "";

// //     if (url.includes("watch?v=") || url.includes("youtube")) {
// //       const id = url.includes("watch?v=")
// //         ? url.split("watch?v=")[1].split("&")[0]
// //         : url.split("/").pop();

// //       return `https://www.youtube.com/embed/${id}?autoplay=1`;
// //     }

// //     return `${import.meta.env.VITE_IMG_URL}/${url.replace(/\\/g, "/")}`;
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading videos...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center max-w-md">
// //           <div className="text-red-600 text-5xl mb-4">⚠️</div>
// //           <h2 className="text-2xl font-bold mb-2">Error Loading Videos</h2>
// //           <p className="text-gray-600 mb-4">{error}</p>
// //           <button
// //             onClick={fetchVideos}
// //             className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
// //           <h1 className="text-4xl md:text-5xl font-bold mb-4">📹 Video Gallery</h1>
// //           <p className="text-xl text-red-100">Watch the latest news coverage and reports</p>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
// //         {videos.length === 0 ? (
// //           <div className="text-center py-20">
// //             <div className="text-6xl mb-4">🎬</div>
// //             <h2 className="text-2xl font-bold mb-2">No Videos Available</h2>
// //             <p className="text-gray-600">Check back soon for new video content</p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
// //             {videos.map((video, index) => (
// //               <motion.div
// //                 key={video._id}
// //                 initial={{ opacity: 0, y: 40 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.4, delay: index * 0.05 }}
// //                 className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
// //               >
// //                 {/* Video/Thumbnail Container */}
// //                 <div 
// //                   className="relative aspect-video bg-gray-900 overflow-hidden cursor-pointer"
// //                   onClick={() => setPlayingVideoId(video._id)}
// //                 >
// //                   {playingVideoId === video._id ? (
// //                     <iframe
// //                       src={getYoutubeEmbedUrl(video.youtubeUrl)}
// //                       title={video.title}
// //                       className="absolute inset-0 w-full h-full"
// //                       frameBorder="0"
// //                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                       allowFullScreen
// //                     />
// //                   ) : (
// //                     <>
// //                       <img
// //                         src={`${import.meta.env.VITE_IMG_URL}/${video.thumbnail}`}
// //                         alt={video.title}
// //                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
// //                       />
// //                       {/* Play Button Overlay */}
// //                       <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
// //                         <div className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-700 flex items-center justify-center transform group-hover:scale-110 transition-transform">
// //                           <Play className="text-white ml-1" size={28} fill="white" />
// //                         </div>
// //                       </div>
// //                     </>
// //                   )}
                  
// //                   {video.duration && (
// //                     <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
// //                       <Clock size={12} />
// //                       {video.duration}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Content Details */}
// //                 <div className="p-5">
// //                   {video.category?.name && (
// //                     <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded mb-3">
// //                       {video.category.name}
// //                     </span>
// //                   )}
                  
// //                   <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
// //                     {video.title}
// //                   </h3>
                  
// //                   {video.description && (
// //                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
// //                       {video.description}
// //                     </p>
// //                   )}
                  
// //                   <div className="flex items-center justify-between text-sm text-gray-500">
// //                     <span>{new Date(video.publishedAt || video.createdAt).toLocaleDateString()}</span>
// //                     {video.views && (
// //                       <span className="flex items-center gap-1">
// //                         <Eye size={14} />
// //                         {video.views.toLocaleString()}
// //                       </span>
// //                     )}
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Videos;



// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { motion } from "framer-motion";
// import { Play, Clock, Eye } from "lucide-react";

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const Videos = () => {

//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [playingVideoId, setPlayingVideoId] = useState(null);

//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const observer = useRef();

//   const fetchVideos = async (pageNumber = 1) => {

//     try {

//       const res = await fetch(
//         `${API_BASE_URL}/videos?status=PUBLISHED&page=${pageNumber}&limit=9`
//       );

//       const data = await res.json();

//       if (res.ok) {

//         setVideos(prev =>
//           pageNumber === 1 ? data.videos : [...prev, ...data.videos]
//         );

//         if (data.videos.length < 9) {
//           setHasMore(false);
//         }

//         setPage(pageNumber + 1);
//       }

//     } catch (err) {
//       console.error(err);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const lastVideoRef = useCallback(node => {

//     if (loading) return;

//     if (observer.current) observer.current.disconnect();

//     observer.current = new IntersectionObserver(entries => {

//       if (entries[0].isIntersecting && hasMore) {
//         fetchVideos(page);
//       }

//     });

//     if (node) observer.current.observe(node);

//   }, [loading, hasMore, page]);



//   const getYoutubeEmbedUrl1 = (url) => {

//     if (!url) return "";

//     if (url.includes("watch?v=")) {
//       const id = url.split("watch?v=")[1].split("&")[0];
//       return `https://www.youtube.com/embed/${id}?autoplay=1`;
//     }

//     if (url.includes("youtu.be")) {
//       const id = url.split("youtu.be/")[1];
//       return `https://www.youtube.com/embed/${id}?autoplay=1`;
//     }

//     return "";
//   };

// const getYoutubeEmbedUrl = (url) => {
//   if (!url) return null;

//   // YouTube
//   const ytMatch = url.match(
//     /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
//   );
//   if (ytMatch) return { platform: "youtube", id: ytMatch[1], 
//      permalink: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1` };

//   // Instagram (reel or post)
//   const igMatch = url.match(
//     /instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/
//   );
//   if (igMatch) return { platform: "instagram", id: igMatch[1] ,  permalink: `https://www.instagram.com/p/${igMatch[1]}/embed/` };

//   // Facebook video
//   const fbMatch = url.match(
//     /facebook\.com\/(?:watch\/?\?v=|video\/|.*\/videos\/)(\d+)/
//   );
//   if (fbMatch) return { platform: "facebook", id: fbMatch[1] ,  permalink: `https://www.facebook.com/plugins/video.php?href=${fbMatch[1]}&autoplay=1&show_text=0`  };

//   return null;
// };

//   const getYoutubeThumbnail = (url) => {

//     if (!url) return "";

//     let id = "";

//     if (url.includes("watch?v=")) {
//       id = url.split("watch?v=")[1].split("&")[0];
//     } else if (url.includes("youtu.be")) {
//       id = url.split("youtu.be/")[1];
//     }

//     return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
//   };


//   if (loading && videos.length === 0) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         Loading Videos...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Header */}
//       <div className="bg-red-600 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4">
//           <h1 className="text-4xl font-bold">Video Gallery</h1>
//         </div>
//       </div>


//       <div className="max-w-7xl mx-auto px-4 py-10">

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {videos.map((video, index) => {

//             const isLast = videos.length === index + 1;

//             const thumbnail =
//               video.thumbnail
//                 ? `${import.meta.env.VITE_IMG_URL}/${video.thumbnail}`
//                 : getYoutubeThumbnail(video.youtubeUrl);

//             const Card = (
//               <motion.div
//                 className="bg-white rounded-xl overflow-hidden shadow"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >

//                 {/* Video */}
//                 <div
//                   className="relative aspect-video cursor-pointer"
//                   onClick={() => setPlayingVideoId(video._id)}
//                 >

//                   {playingVideoId === video._id ? (

//                     <iframe
//                       src={getYoutubeEmbedUrl(video.youtubeUrl.includes('youtube') ? video.youtubeUrl : video.data?.mediaInfo?.permalink)?.permalink}
//                       className="absolute inset-0 w-full h-full"
//                       allowFullScreen
//                     />

//                   ) : (

//                     <>
//                       <img
//                         src={thumbnail}
//                         className="w-full h-full object-cover"
//                       />

//                       <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
//                         <div className="w-14 h-14 bg-red-600 rounded-full flex justify-center items-center">
//                           <Play fill="white" className="text-white ml-1" />
//                         </div>
//                       </div>
//                     </>

//                   )}

//                 </div>


//                 {/* Content */}
//                 <div className="p-4">

//                   <h3 className="font-semibold line-clamp-2">
//                     {video.title}
//                   </h3>

//                   <div className="flex justify-between text-sm text-gray-500 mt-3">

//                     <span>
//                       {new Date(
//                         video.publishedAt || video.createdAt
//                       ).toLocaleDateString()}
//                     </span>

//                     {video.views && (
//                       <span className="flex items-center gap-1">
//                         <Eye size={14} />
//                         {video.views}
//                       </span>
//                     )}

//                   </div>

//                 </div>

//               </motion.div>
//             );


//             if (isLast) {
//               return (
//                 <div ref={lastVideoRef} key={video._id}>
//                   {Card}
//                 </div>
//               );
//             }

//             return (
//               <div key={video._id}>
//                 {Card}
//               </div>
//             );

//           })}

//         </div>


//         {loading && (
//           <p className="text-center mt-6 text-gray-500">
//             Loading more videos...
//           </p>
//         )}

//       </div>

//     </div>
//   );
// };

// export default Videos;





import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Eye } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


const getVideoEmbed = (url) => {
  if (!url) return null;

  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (ytMatch) return {
    platform: "youtube",
    id: ytMatch[1],
    permalink: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`, // ✅ proper embed URL
    thumbnail: `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`,
  };

  // Instagram
  const igMatch = url.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
  if (igMatch) return {
    platform: "instagram",
    id: igMatch[1],
    permalink: `https://www.instagram.com/p/${igMatch[1]}/embed/`, // ✅ proper embed URL
    thumbnail: null,
  };

  // Facebook
  const fbMatch = url.match(
    /facebook\.com\/(?:watch\/?\?v=|video\/|.*\/videos\/)(\d+)/
  );
  if (fbMatch) return {
    platform: "facebook",
    id: fbMatch[1],
    permalink: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&autoplay=1&show_text=0`, // ✅ full encoded URL
    thumbnail: null,
  };

  return null;
};
// ─── Platform Badge Colors ────────────────────────────────────────────────────
const platformStyles = {
  youtube:   { bg: "bg-red-600",   label: "YouTube"   },
  instagram: { bg: "bg-pink-500",  label: "Instagram" },
  facebook:  { bg: "bg-blue-600",  label: "Facebook"  },
};

// ─── Video Card ───────────────────────────────────────────────────────────────
const VideoCard = ({ video, isLast, lastVideoRef, playingVideoId, setPlayingVideoId }) => {

  const embed = getVideoEmbed(video.youtubeUrl.includes('youtube') ? video.youtubeUrl : video.data?.mediaInfo?.permalink);

  const thumbnail = video.thumbnail
    ? `${import.meta.env.VITE_IMG_URL}/${video.thumbnail}`
    : embed?.thumbnail ?? null;

  const isPlaying = playingVideoId === video._id;
  const style = embed ? platformStyles[embed.platform] : null;

  return (
    <div ref={isLast ? lastVideoRef : null} key={video._id}>
      <motion.div
        className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 group"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* ── Video / Thumbnail ── */}
        <div
          className="relative aspect-video cursor-pointer bg-gray-900 overflow-hidden"
          onClick={() => setPlayingVideoId(video._id)}
        >
          {isPlaying ? (
            embed ? (
              <iframe
                src={embed.permalink}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                scrolling="no"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                Preview unavailable
              </div>
            )
          ) : (
            <>
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                // Instagram / Facebook placeholder
                <div className={`w-full h-full flex flex-col items-center justify-center gap-2
                  ${style?.bg ?? "bg-gray-700"}`}>
                  <Play className="text-white" size={40} />
                  <span className="text-white text-xs font-medium">{style?.label}</span>
                </div>
              )}

              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 bg-red-600 group-hover:scale-110 transition-transform rounded-full flex items-center justify-center">
                  <Play fill="white" className="text-white ml-1" size={22} />
                </div>
              </div>
            </>
          )}

          {/* Platform Badge */}
          {style && !isPlaying && (
            <span className={`absolute top-2 left-2 text-xs text-white font-semibold
              px-2 py-0.5 rounded-full ${style.bg}`}>
              {style.label}
            </span>
          )}
        </div>

        {/* ── Content ── */}
        <div className="p-4">
          {video.category?.name && (
            <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded mb-2">
              {video.category.name}
            </span>
          )}

          <h3 className="font-semibold line-clamp-2 group-hover:text-red-600 transition-colors">
            {video.title}
          </h3>

          {video.description && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {video.description}
            </p>
          )}

          <div className="flex justify-between text-xs text-gray-400 mt-3">
            <span>
              {new Date(video.publishedAt || video.createdAt).toLocaleDateString()}
            </span>
            {video.views && (
              <span className="flex items-center gap-1">
                <Eye size={13} />
                {video.views.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Videos = () => {
  const [videos, setVideos]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [page, setPage]               = useState(1);
  const [hasMore, setHasMore]         = useState(true);
  const observer = useRef();

  const fetchVideos = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE_URL}/videos?status=PUBLISHED&page=${pageNumber}&limit=9`);
      const data = await res.json();
      if (res.ok) {
        setVideos(prev => pageNumber === 1 ? data.videos : [...prev, ...data.videos]);
        setHasMore(data.videos.length === 9);
        setPage(pageNumber + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(1); }, []);

  const lastVideoRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) fetchVideos(page);
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page]);

  if (loading && videos.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">📹 Video Gallery</h1>
          <p className="text-red-100 mt-1">Watch the latest news coverage and reports</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {videos.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-xl font-semibold">No Videos Available</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <VideoCard
                key={video._id}
                video={video}
                isLast={index === videos.length - 1}
                lastVideoRef={lastVideoRef}
                playingVideoId={playingVideoId}
                setPlayingVideoId={setPlayingVideoId}
              />
            ))}
          </div>
        )}

        {loading && (
          <p className="text-center mt-8 text-gray-400">Loading more videos...</p>
        )}
      </div>

    </div>
  );
};

export default Videos;