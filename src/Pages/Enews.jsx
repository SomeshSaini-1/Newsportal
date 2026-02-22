// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Calendar,
//   Eye,
//   Newspaper,
//   Share2,
//   X,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;

// const Enews = () => {
//   const [epapers, setEpapers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");

//   // Viewer state
//   const [isViewerOpen, setIsViewerOpen] = useState(false);
//   const [images, setImages] = useState([]);
//   const [title, setTitle] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const fetchEpapers = async () => {
//     setLoading(true);
//     try {
//       let url = `${API_BASE_URL}/news/getEnews`;
//       if (selectedDate) url += `?date=${selectedDate}`;

//       const res = await fetch(url);
//       const data = await res.json();

//       if (res.ok) setEpapers(data || []);
//       else setError(data.message || "Failed to load");
//     } catch (e) {
//       setError("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEpapers();
//   }, [selectedDate]);

//   const handleView = (eimg, title) => {
//     const imgs = Array.isArray(eimg) ? eimg : [eimg];
//     setImages(imgs);
//     setTitle(title);
//     setCurrentIndex(0);
//     setIsViewerOpen(true);
//   };

//   const currentImageUrl =
//     images[currentIndex] &&
//     `${IMG_BASE_URL}/${images[currentIndex].replace(/\\/g, "/")}`;

//   const handleShareImage = async () => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title,
//           text: `${title} - Page ${currentIndex + 1}`,
//           url: currentImageUrl,
//         });
//       } else {
//         await navigator.clipboard.writeText(currentImageUrl);
//         alert("Image link copied!");
//       }
//     } catch (err) {
//       console.error("Share failed", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-16 w-16 border-b-4 border-blue-600 rounded-full" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-blue-600 text-white py-10 px-6">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div className="flex gap-4 items-center">
//             <Newspaper size={44} />
//             <div>
//               <h1 className="text-4xl font-bold">E-Paper Archive</h1>
//               <p className="text-blue-100">Digital editions</p>
//             </div>
//           </div>

//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="px-4 py-2 rounded-lg text-gray-900"
//           />
//         </div>
//       </div>

//       {/* Grid */}
//       <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {epapers.map((epaper, index) => (
//           <motion.div
//             key={epaper._id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }}
//             className="bg-white rounded-xl shadow overflow-hidden"
//           >
//             <div className="aspect-[3/4] bg-gray-200">
//               {epaper.eimg?.length && (
//                 <img
//                   src={`${IMG_BASE_URL}/${epaper.eimg[0].replace(/\\/g, "/")}`}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//             </div>

//             <div className="p-4">
//               <h3 className="font-bold mb-2 line-clamp-2">{epaper.title}</h3>

//               <div className="text-sm text-gray-600 flex items-center gap-2 mb-3">
//                 <Calendar size={14} />
//                 {new Date(epaper.createdAt).toLocaleDateString()}
//               </div>

//               <button
//                 onClick={() => handleView(epaper.eimg, epaper.title)}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
//               >
//                 <Eye size={16} /> View
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* FULL PAGE IMAGE VIEWER */}
//       {isViewerOpen && (
//         <div className="fixed inset-0 z-50 bg-black flex flex-col">
//           {/* Top bar */}
//           <div className="flex justify-between items-center p-4 text-white">
//             <h2 className="font-semibold">
//               {title} — Page {currentIndex + 1}/{images.length}
//             </h2>
//             <button onClick={() => setIsViewerOpen(false)}>
//               <X size={28} />
//             </button>
//           </div>

//           {/* Image */}
//           <div className="flex-1 flex items-center justify-center relative">
//             <img
//               src={currentImageUrl}
//               className="max-h-full max-w-full object-contain"
//             />

//             {/* Prev */}
//             {currentIndex > 0 && (
//               <button
//                 onClick={() => setCurrentIndex((i) => i - 1)}
//                 className="absolute left-4 text-white bg-black/50 p-3 rounded-full"
//               >
//                 <ChevronLeft size={28} />
//               </button>
//             )}

//             {/* Next */}
//             {currentIndex < images.length - 1 && (
//               <button
//                 onClick={() => setCurrentIndex((i) => i + 1)}
//                 className="absolute right-4 text-white bg-black/50 p-3 rounded-full"
//               >
//                 <ChevronRight size={28} />
//               </button>
//             )}
//           </div>

//           {/* Bottom bar */}
//           <div className="p-4 flex justify-center">
//             <button
//               onClick={handleShareImage}
//               className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg"
//             >
//               <Share2 size={18} /> Share this page
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Enews;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Eye, Newspaper, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;

const Enews = () => {
  const [epapers, setEpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const fetchEpapers = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/news/getEnews`;
      if (selectedDate) url += `?date=${selectedDate}`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) setEpapers(data || []);
      else setError(data.message || "Failed to load");
    } catch (e) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpapers();
  }, [selectedDate]);

  const handleView = (epaper) => {
    // Navigate to viewer page with epaper data
    navigate(`/enews/${epaper._id}`, {
      state: {
        images: Array.isArray(epaper.eimg) ? epaper.eimg : [epaper.eimg],
        title: epaper.title,
        createdAt: epaper.createdAt,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-16 w-16 border-b-4 border-blue-600 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <Newspaper size={44} />
            <div>
              <h1 className="text-4xl font-bold">E-Paper Archive</h1>
              <p className="text-blue-100">Digital editions</p>
            </div>
          </div>

          {/* <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-900"
          /> */}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {epapers.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">
              No e-papers found for this date
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {epapers.map((epaper, index) => (
              <motion.div
                key={epaper._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="aspect-[3/4] bg-gray-200">
                  {epaper.eimg?.length && (
                    <img
                      src={`${IMG_BASE_URL}/${epaper.eimg[0].replace(/\\/g, "/")}`}
                      alt={epaper.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold mb-2 line-clamp-2">
                    {epaper.title}
                  </h3>

                  <div className="text-sm text-gray-600 flex items-center gap-2 mb-3">
                    <Calendar size={14} />
                    {new Date(epaper.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(epaper)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Eye size={16} /> View E-Paper
                    </button>

                    <Share2
                      className="m-auto cursor-pointer hover:text-green-600 text-xl  rounded"
                      onClick={() => {
                        const data = `${window.location.origin}/enews/${epaper._id}`;

                        navigator.clipboard
                          .writeText(data)
                          .then(() => {
                            alert("Link copied to clipboard!"); // Or use a toast notification
                          })
                          .catch((err) => {
                            console.error("Failed to copy:", err);
                          });
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Enews;
