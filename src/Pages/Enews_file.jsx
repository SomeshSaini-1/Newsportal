import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  X, ChevronLeft, ChevronRight,
  ZoomIn, ZoomOut, Calendar, Home, Fullscreen,
} from "lucide-react";

const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const EnewsViewer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [images, setImages]             = useState([]);
  const [title, setTitle]               = useState("");
  const [createdAt, setCreatedAt]       = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom]                 = useState(1);
  const [position, setPosition]         = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging]     = useState(false);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  const dragStart = useRef(null);
  const posRef    = useRef({ x: 0, y: 0 });

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchEpaperData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res  = await fetch(`${API_BASE_URL}/news/getEnews?id=${id}`);
      const data = await res.json();
      if (res.ok) {
        const epaper = Array.isArray(data) ? data[0] : data;
        if (!epaper) throw new Error("E-paper not found");
        setImages(Array.isArray(epaper.eimg) ? epaper.eimg : [epaper.eimg]);
        setTitle(epaper.title || "Untitled");
        setCreatedAt(epaper.createdAt || new Date().toISOString());
      } else {
        setError(data.message || "Failed to load e-paper");
      }
    } catch (err) {
      setError("Failed to load e-paper data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchEpaperData(); }, [fetchEpaperData]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    posRef.current = { x: 0, y: 0 };
  };

  const currentImageUrl = images[currentIndex]
    ? `${IMG_BASE_URL}/${images[currentIndex].replace(/\\/g, "/")}`
    : "";

  // ── Navigation ─────────────────────────────────────────────────────────────
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) { setCurrentIndex(p => p - 1); resetView(); }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) { setCurrentIndex(p => p + 1); resetView(); }
  }, [currentIndex, images.length]);

  // ── Zoom ───────────────────────────────────────────────────────────────────
  const handleZoomIn  = useCallback(() => setZoom(z => Math.min(z + 0.25, 4)), []);
  const handleZoomOut = useCallback(() => {
    setZoom(z => {
      const next = Math.max(z - 0.25, 0.5);
      if (next <= 1) { setPosition({ x: 0, y: 0 }); posRef.current = { x: 0, y: 0 }; }
      return next;
    });
  }, []);

  // ── Scroll-wheel zoom ──────────────────────────────────────────────────────
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setZoom(z => {
      const next = e.deltaY < 0 ? Math.min(z + 0.1, 4) : Math.max(z - 0.1, 0.5);
      if (next <= 1) { setPosition({ x: 0, y: 0 }); posRef.current = { x: 0, y: 0 }; }
      return next;
    });
  }, []);

  // ── Drag-to-pan (mouse) ────────────────────────────────────────────────────
  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart.current) return;
    const newPos = { x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y };
    posRef.current = newPos;
    setPosition(newPos);
  };

  const handleMouseUp = () => { setIsDragging(false); dragStart.current = null; };

  // ── Drag-to-pan (touch) ────────────────────────────────────────────────────
  const handleTouchStart = (e) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    const t = e.touches[0];
    dragStart.current = { x: t.clientX - posRef.current.x, y: t.clientY - posRef.current.y };
  };

  const handleTouchMove = (e) => {
    if (!dragStart.current || e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    const newPos = { x: t.clientX - dragStart.current.x, y: t.clientY - dragStart.current.y };
    posRef.current = newPos;
    setPosition(newPos);
  };

  const handleTouchEnd = () => { dragStart.current = null; };

  // ── Download ───────────────────────────────────────────────────────────────
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentImageUrl;
    link.download = `${title.replace(/\s+/g, "-")}-page-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ── Keyboard ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")          handlePrevious();
      if (e.key === "ArrowRight")         handleNext();
      if (e.key === "Escape")             navigate("/enews");
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-" || e.key === "_") handleZoomOut();
      if (e.key === "0")                  resetView();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrevious, handleNext, handleZoomIn, handleZoomOut, navigate]);

  // ── Favicon ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!currentImageUrl) return;
    let link = document.querySelector("link[rel*='icon']");
    if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
    link.type = "image/jpeg";
    link.href = currentImageUrl;
  }, [currentImageUrl]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="animate-spin h-16 w-16 border-b-4 border-blue-600 rounded-full" />
    </div>
  );

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white p-4">
      <p className="text-xl mb-4 text-red-400">{error}</p>
      <button
        onClick={() => navigate("/enews")}
        className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
      >
        <Home size={18} /> Back to List
      </button>
    </div>
  );

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{title} | Media Plus News</title>
          <link rel="icon" type="image/png" href={currentImageUrl} />
          <meta property="og:title"       content={title} />
          <meta property="og:description" content={`Read ${title} on Media Plus News`} />
          <meta property="og:image"       content={currentImageUrl} />
          <meta property="og:type"        content="article" />
          <meta property="og:url"         content={pageUrl} />
          <meta property="og:site_name"   content="Media Plus News" />
          <meta property="fb:app_id"      content={import.meta.env.VITE_FACEBOOK_APP_ID} />
        </Helmet>

        <div className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden">

          {/* ── Header ────────────────────────────────────────────────────────── */}
          <div className="bg-gradient-to-b from-black/90 to-transparent p-4 flex justify-between items-center text-white z-10 shrink-0">
            <div className="flex-1">
              <h2 className="font-semibold text-lg md:text-xl mb-1 line-clamp-1">{title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {new Date(createdAt).toLocaleDateString()}
                </span>
                <span>Page {currentIndex + 1} of {images.length}</span>
              </div>
            </div>

            {/* Zoom bar — desktop */}
            <div className="hidden md:flex items-center gap-1 bg-white/10 rounded-xl p-1 backdrop-blur-md border border-white/10 mr-3">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                className="p-2 text-white hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut size={18} />
              </button>
              <button
                onClick={resetView}
                className="text-white text-xs font-semibold min-w-[3rem] text-center hover:bg-white/10 rounded-lg px-1 py-2 transition-colors"
                title="Reset zoom (0)"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 4}
                className="p-2 text-white hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            <button
              onClick={() => navigate("/enews")}
              className="p-2 hover:bg-white/10 rounded-full transition-colors ml-2"
              title="Close (Esc)"
            >
              <X size={28} />
            </button>
          </div>

          {/* ── Image Viewer ──────────────────────────────────────────────────── */}
          <div
            className="flex-1 flex items-center justify-center relative overflow-hidden"
            style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={currentImageUrl}
                alt={`${title} - Page ${currentIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="object-contain select-none pointer-events-none rounded-lg shadow-2xl"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transition: isDragging ? "none" : "transform 0.15s ease-out",
                  transformOrigin: "center center",
                }}
                draggable={false}
              />
            </AnimatePresence>

            {/* Prev / Next arrows — desktop, hidden when zoomed */}
            {zoom === 1 && currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="hidden md:flex absolute left-6 text-white bg-black/50 hover:bg-black/70 p-4 rounded-full transition-colors backdrop-blur-md z-20"
              >
                <ChevronLeft size={32} />
              </button>
            )}
            {zoom === 1 && currentIndex < images.length - 1 && (
              <button
                onClick={handleNext}
                className="hidden md:flex absolute right-6 text-white bg-black/50 hover:bg-black/70 p-4 rounded-full transition-colors backdrop-blur-md z-20"
              >
                <ChevronRight size={32} />
              </button>
            )}

            {/* Pan hint */}
            {zoom > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none select-none">
                Drag to pan · scroll to zoom · press 0 to reset
              </div>
            )}
          </div>

          {/* ── Bottom Controls ───────────────────────────────────────────────── */}
          <div className="bg-gradient-to-t from-black/90 to-transparent p-4 z-10 shrink-0">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center items-center gap-3">

                {/* Zoom bar — mobile */}
                <div className="flex md:hidden items-center gap-1 bg-white/10 rounded-xl p-1 backdrop-blur-md border border-white/10">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    className="p-2 text-white hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button
                    onClick={resetView}
                    className="text-white text-xs font-semibold min-w-[3rem] text-center hover:bg-white/10 rounded-lg px-1 py-2 transition-colors"
                  >
                    {Math.round(zoom * 100)}%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 4}
                    className="p-2 text-white hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors"
                  >
                    <ZoomIn size={18} />
                  </button>
                </div>

                {/* Prev / Next — mobile */}
                {images.length > 1 && (
                  <div className="flex md:hidden items-center gap-2">
                    <button
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentIndex === images.length - 1}
                      className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}

                {/* <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all active:scale-95 shadow-lg"
                >
                  <Fullscreen size={18} /> <span className="hidden sm:inline">Full Page</span>
                </button>

                <button
                  onClick={() => navigate("/enews")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10"
                >
                  <Home size={18} /> <span className="hidden sm:inline">Back to List</span>
                </button> */}
              </div>

              {/* Page dots */}
              {images.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 px-4 max-w-full">
                   {images.map((img, i) => (
            <img
              key={i}
              //`${IMG_BASE_URL}/${images[currentIndex].replace(/\\/g, "/")}`
              src={`${IMG_BASE_URL}/${img}`}
              alt={`thumb-${i}`}
              onClick={() => { setCurrentIndex(i); setZoom(1); setPosition({ x: 0, y: 0 }); }}
              className={`h-14 w-14 object-cover rounded-md cursor-pointer border-2 transition-all ${
                i === currentIndex ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            />
          ))}
                  {/* {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setCurrentIndex(idx); resetView(); }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "w-8 bg-blue-500"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                      title={`Page ${idx + 1}`}
                    />
                  ))} */}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </HelmetProvider>
  );
};

export default EnewsViewer;



// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Helmet, HelmetProvider } from 'react-helmet-async';

// import {
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Share2,
//   Download,
//   ZoomIn,
//   ZoomOut,
//   Calendar,
//   Home,
//   Fullscreen,
// } from "lucide-react";

// // Environment Constants
// const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;
// const API_BASE_URL = import.meta.env.VITE_API_URL;

// const EnewsViewer = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // State Management
//   const [images, setImages] = useState([]);
//   const [title, setTitle] = useState("");
//   const [createdAt, setCreatedAt] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [zoom, setZoom] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch Data
//   const fetchEpaperData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${API_BASE_URL}/news/getEnews?id=${id}`);
//       const data = await response.json();

//       if (response.ok) {
//         const epaper = Array.isArray(data) ? data[0] : data;
//         if (!epaper) throw new Error("E-paper not found");

//         const imgs = Array.isArray(epaper.eimg) ? epaper.eimg : [epaper.eimg];
//         setImages(imgs);
//         setTitle(epaper.title || "Untitled");
//         setCreatedAt(epaper.createdAt || new Date().toISOString());
//       } else {
//         setError(data.message || "Failed to load e-paper");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to load e-paper data");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchEpaperData();
//   }, [fetchEpaperData]);

//   // Derived Values
//   const currentImageUrl = images[currentIndex]
//     ? `${IMG_BASE_URL}/${images[currentIndex].replace(/\\/g, "/")}`
//     : "";

//   // Handlers
//   const handlePrevious = useCallback(() => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - 1);
//       setZoom(1);
//     }
//   }, [currentIndex]);

//   const handleNext = useCallback(() => {
//     if (currentIndex < images.length - 1) {
//       setCurrentIndex((prev) => prev + 1);
//       setZoom(1);
//     }
//   }, [currentIndex, images.length]);

//   const handleZoomIn = useCallback(
//     () => setZoom((prev) => Math.min(prev + 0.25, 3)),
//     [],
//   );
//   const handleZoomOut = useCallback(
//     () => setZoom((prev) => Math.max(prev - 0.25, 0.5)),
//     [],
//   );

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = currentImageUrl;
//     link.download = `${title.replace(/\s+/g, "-")}-page-${currentIndex + 1}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === "ArrowLeft") handlePrevious();
//       if (e.key === "ArrowRight") handleNext();
//       if (e.key === "Escape") navigate("/enews");
//       if (e.key === "+" || e.key === "=") handleZoomIn();
//       if (e.key === "-" || e.key === "_") handleZoomOut();
//     };
//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [handlePrevious, handleNext, handleZoomIn, handleZoomOut, navigate]);

//   // Loading & Error UI
//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black flex items-center justify-center">
//         <div className="animate-spin h-16 w-16 border-b-4 border-blue-600 rounded-full" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white p-4">
//         <p className="text-xl mb-4 text-red-400">{error}</p>
//         <button
//           onClick={() => navigate("/enews")}
//           className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
//         >
//           <Home size={18} /> Back to List
//         </button>
//       </div>
//     );
//   }

//   const setFavicon = (url) => {
//     let link = document.querySelector("link[rel*='icon']");

//     if (!link) {
//       link = document.createElement("link");
//       link.rel = "icon";
//       document.head.appendChild(link);
//     }

//     link.type = "image/jpeg"; // change based on your file type
//     link.href = url;
//   };

//   // useEffect(()=> {
//   console.log(currentImageUrl);
//   setFavicon(currentImageUrl);
//   // },[]);
  
// const pageUrl = typeof window !== "undefined" ? window.location.href : "";


//   return (
//         <HelmetProvider>
//       <div>

// <Helmet>
//   <title>{title} | Media Plus News</title>

//   <link rel="icon" type="image/png" href={currentImageUrl} />

//   {/* Open Graph */}
//   <meta property="og:title" content={title} />
//   <meta property="og:description" content={`Read ${title} on Media Plus News`} />
//   <meta property="og:image" content={currentImageUrl} />
//   <meta property="og:type" content="article" />
//   <meta property="og:url" content={pageUrl} />

//   {/* Optional but recommended */}
//   <meta property="og:site_name" content="Media Plus News" />

//   {/* Facebook App ID */}
//   <meta property="fb:app_id" content={import.meta.env.VITE_FACEBOOK_APP_ID} />
// </Helmet>

//         {/* <Helmet>
//           <title>{title} | Media Plus News</title>
//           <link rel="icon" type="image/svg+xml" href={currentImageUrl} />
//           <meta property="og:title" content={title} />
//           <meta property="og:description" content={`Read ${title} on Media Plus News`} />
//           <meta property="og:image" content={currentImageUrl} />
//           <meta property="og:type" content="article" />
//           <meta property="og:url" content={window.location.href} />
//         </Helmet>
//          */}
//     <div className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-b from-black/90 to-transparent p-4 flex justify-between items-start text-white z-10">
//         <div className="flex-1">
//           <h2 className="font-semibold text-lg md:text-xl mb-1 line-clamp-1">
//             {title}
//           </h2>
//           <div className="flex items-center gap-4 text-sm text-gray-300">
//             <span className="flex items-center gap-1">
//               <Calendar size={14} /> {new Date(createdAt).toLocaleDateString()}
//             </span>
//             <span>
//               Page {currentIndex + 1} of {images.length}
//             </span>
//           </div>
//         </div>
//         <button
//           onClick={() => navigate("/enews")}
//           className="p-2 hover:bg-white/10 rounded-full transition-colors ml-4"
//           title="Close (Esc)"
//         >
//           <X size={28} />
//         </button>
//       </div>

//       {/* Image Viewer */}
//       <div className="flex-1 flex items-center justify-center relative overflow-auto p-4 custom-scrollbar">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={currentIndex}
//             src={currentImageUrl}
//             alt={`${title} - Page ${currentIndex + 1}`}
//             className="max-h-full max-w-full object-contain origin-center"
//             initial={{ opacity: 0, scale: zoom }}
//             animate={{ opacity: 1, scale: zoom }}
//             exit={{ opacity: 0, scale: zoom }}
//             transition={{ duration: 0.2, ease: "easeOut" }}
//           />
//         </AnimatePresence>

//         {currentIndex > 0 && (
//           <button
//             onClick={handlePrevious}
//             className="hidden md:flex absolute left-6 text-white bg-black/50 hover:bg-black/70 p-4 rounded-full transition-colors backdrop-blur-md z-20"
//           >
//             <ChevronLeft size={32} />
//           </button>
//         )}
//         {currentIndex < images.length - 1 && (
//           <button
//             onClick={handleNext}
//             className="hidden md:flex absolute right-6 text-white bg-black/50 hover:bg-black/70 p-4 rounded-full transition-colors backdrop-blur-md z-20"
//           >
//             <ChevronRight size={32} />
//           </button>
//         )}
//       </div>

//       {/* Bottom Controls */}
//       <div className="bg-gradient-to-t from-black/90 to-transparent p-4 z-10">
//         <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
//           <div className="flex flex-wrap justify-center items-center gap-3">
//             {/* Zoom Controls */}
//             {/* <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1 backdrop-blur-md border border-white/10">
//               <button onClick={handleZoomOut} disabled={zoom <= 0.5} className="p-2 text-white hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors">
//                 <ZoomOut size={20} />
//               </button>
//               <span className="text-white text-sm font-medium min-w-[3.5rem] text-center">
//                 {Math.round(zoom * 100)}%
//               </span>
//               <button onClick={handleZoomIn} disabled={zoom >= 3} className="p-2 text-white hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors">
//                 <ZoomIn size={20} />
//               </button>
//             </div> */}

//             {/* Action Buttons */}
//             <button
//               onClick={handleDownload}
//               className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all active:scale-95 shadow-lg"
//             >
//               <Fullscreen size={18} />{" "}
//               <span className="hidden sm:inline">Full Page</span>
//             </button>

//             <button
//               onClick={() => navigate("/enews")}
//               className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10"
//             >
//               <Home size={18} />{" "}
//               <span className="hidden sm:inline">Back to List</span>
//             </button>
//           </div>

//           {/* Page Indicators */}
//           {images.length > 1 && (
//             <div className="flex flex-wrap justify-center gap-2 px-4 max-w-full">
//               {images.map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => {
//                     setCurrentIndex(idx);
//                     setZoom(1);
//                   }}
//                   className={`h-1.5 rounded-full transition-all duration-300 ${
//                     idx === currentIndex
//                       ? "w-8 bg-blue-500"
//                       : "w-2 bg-white/20 hover:bg-white/40"
//                   }`}
//                   title={`Go to page ${idx + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//       </div>
//     </HelmetProvider>
//   );
// };

// export default EnewsViewer;
