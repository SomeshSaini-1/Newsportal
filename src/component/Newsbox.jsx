import React from "react";
import {motion} from "framer-motion"

const NewsBox = ({ dataarr, title, width = 16 }) => {
  return (
    <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay:  0.8 }}
            viewport={{ once: true }}
             className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      {/* Latest News Section */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4  flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {title || "Latest"}
          </h2>
          <div className="flex-1 h-1 bg-red-700"></div>
        </div>

        {/* News Grid */}
        {/* 
        <div className="flex items-center justify-center flex-wrap gap-6 p-6">
          {dataarr.map((item, index) => (
            <div key={index} className="group cursor-pointer max-w-xl">
              <div
                className="h-40 bg-gray-200 rounded-lg mb-3 bg-cover bg-center transition-transform group-hover:scale-[1.02]"
                style={{ backgroundImage: `url('${item.imageUrls[0]}')` }} // Use first image or add carousel
              ></div>
              <h3 className="font-semibold text-gray-900 leading-tight mb-1 group-hover:text-red-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium">{item.source}</p>
            </div>
          ))}
        </div> */}

        <div className="flex justify-center flex-wrap gap-6 p-6">
          {dataarr.map((item, index) => (
            <div
              key={index}
              className={`group cursor-pointer w-[20rem] sm:w-[${width}rem]`}
            >
              {/* Image */}
              <div
                className="h-44 rounded-lg mb-3 bg-cover bg-center 
                   transition-transform duration-300 
                   group-hover:scale-105"
                style={{ backgroundImage: `url(${item.imageUrls?.[0]})` }}
              />

              {/* Content */}
              <h3
                className="font-semibold text-gray-900 leading-snug 
                     mb-1 line-clamp-2 
                     group-hover:text-red-600 transition-colors"
              >
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 font-medium">{item.source}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsBox;
