import React from "react";
import {motion} from "framer-motion"

const Newsvideo = ({ dataarr = [], title, width = 20 }) => {
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    const id =
      url.includes("watch?v=")
        ? url.split("watch?v=")[1].split("&")[0]
        : url.split("/").pop();
    // return `https://www.youtube.com/embed/${id}`;
    return `https://www.youtube.com/embed/${id}`;
  };

  return (
    <motion.div
    
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay:  0.8 }}
            viewport={{ once: true }}
             className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {title || "Latest Videos"}
          </h2>
          <div className="flex-1 h-1 bg-red-700" />
        </div>

        {/* YouTube Grid */}
        <div className="flex justify-center flex-wrap gap-6 p-6">
          {dataarr.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer"
              style={{ width: `${width}rem` }}
            >
              {/* YouTube iframe */}
              <div className="relative w-full h-44 mb-3 rounded-lg overflow-hidden">
                <iframe
                  src={getYoutubeEmbedUrl('https://www.youtube.com/watch?v=Und5xmWAXOw')}
                  title={item.title}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-gray-900 leading-snug mb-1 line-clamp-2 hover:text-red-600">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 font-medium">
                {item.source}
              </p>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default Newsvideo;
