import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Share2, Download, ZoomIn, ZoomOut, Calendar, Home, Fullscreen } from "lucide-react";

// Environment Constants
const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const EnewsViewer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State Management
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data
  const fetchEpaperData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/news/getEnews?id=${id}`);
      const data = await response.json();
      
      if (response.ok) {
        const epaper = Array.isArray(data) ? data[0] : data;
        if (!epaper) throw new Error("E-paper not found");
        
        const imgs = Array.isArray(epaper.eimg) ? epaper.eimg : [epaper.eimg];
        setImages(imgs);
        setTitle(epaper.title || "Untitled");
        setCreatedAt(epaper.createdAt || new Date().toISOString());
      } else {
        setError(data.message || "Failed to load e-paper");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load e-paper data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEpaperData();
  }, [fetchEpaperData]);

  // Derived Values
  const currentImageUrl = images[currentIndex] 
    ? `${IMG_BASE_URL}/${images[currentIndex].replace(/\\/g, "/")}` 
    : "";

  // Handlers
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setZoom(1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setZoom(1);
    }
  }, [currentIndex, images.length]);

  const handleZoomIn = useCallback(() => setZoom((prev) => Math.min(prev + 0.25, 3)), []);
  const handleZoomOut = useCallback(() => setZoom((prev) => Math.max(prev - 0.25, 0.5)), []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentImageUrl;
    link.download = `${title.replace(/\s+/g, "-")}-page-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") navigate("/enews");
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-" || e.key === "_") handleZoomOut();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handlePrevious, handleNext, handleZoomIn, handleZoomOut, navigate]);

  // Loading & Error UI
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="animate-spin h-16 w-16 border-b-4 border-blue-600 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white p-4">
        <p className="text-xl mb-4 text-red-400">{error}</p>
        <button onClick={() => navigate("/enews")} className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
          <Home size={18} /> Back to List
        </button>
      </div>
    );
  }

  const setFavicon = (url) => {
  let link = document.querySelector("link[rel*='icon']");

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.type = "image/jpeg";  // change based on your file type
  link.href = url;
};

// useEffect(()=> {
    console.log(currentImageUrl);
    setFavicon(currentImageUrl);
// },[]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-b from-black/90 to-transparent p-4 flex justify-between items-start text-white z-10">
        <div className="flex-1">
          <h2 className="font-semibold text-lg md:text-xl mb-1 line-clamp-1">{title}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {new Date(createdAt).toLocaleDateString()}
            </span>
            <span>Page {currentIndex + 1} of {images.length}</span>
          </div>
        </div>
        <button onClick={() => navigate("/enews")} className="p-2 hover:bg-white/10 rounded-full transition-colors ml-4" title="Close (Esc)">
          <X size={28} />
        </button>
      </div>

      {/* Image Viewer */}
      <div className="flex-1 flex items-center justify-center relative overflow-auto p-4 custom-scrollbar">

        
        <AnimatePresence mode="wait">
  <motion.img
    key={currentIndex}
    src={currentImageUrl}
    alt={`${title} - Page ${currentIndex + 1}`}
    className="max-h-full max-w-full object-contain origin-center"
    initial={{ opacity: 0, scale: zoom }}
    animate={{ opacity: 1, scale: zoom }}
    exit={{ opacity: 0, scale: zoom }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  />
</AnimatePresence>




        {currentIndex > 0 && (
          <button onClick={handlePrevious} className="hidden md:flex absolute left-6 text-white bg-black/50 hover:bg-black/70 p-4 rounded-full transition-colors backdrop-blur-md z-20">
            <ChevronLeft size={32} />
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button onClick={handleNext} className="hidden md:flex absolute right-6 text-white bg-black/50 hover:bg-black/70 p-4 rounded-full transition-colors backdrop-blur-md z-20">
            <ChevronRight size={32} />
          </button>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-gradient-to-t from-black/90 to-transparent p-4 z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center items-center gap-3">
            {/* Zoom Controls */}
            {/* <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1 backdrop-blur-md border border-white/10">
              <button onClick={handleZoomOut} disabled={zoom <= 0.5} className="p-2 text-white hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors">
                <ZoomOut size={20} />
              </button>
              <span className="text-white text-sm font-medium min-w-[3.5rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button onClick={handleZoomIn} disabled={zoom >= 3} className="p-2 text-white hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors">
                <ZoomIn size={20} />
              </button>
            </div> */}

            {/* Action Buttons */}
            <button onClick={handleDownload} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all active:scale-95 shadow-lg">
              <Fullscreen size={18} /> <span className="hidden sm:inline">Full Page</span>
            </button>
            
            <button onClick={() => navigate("/enews")} className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10">
              <Home size={18} /> <span className="hidden sm:inline">Back to List</span>
            </button>
          </div>

          {/* Page Indicators */}
          {images.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 px-4 max-w-full">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentIndex(idx); setZoom(1); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  title={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnewsViewer;
