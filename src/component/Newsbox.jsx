import React from "react";

const NewsBox = ({ dataarr, title }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {dataarr.map((item, index) => (
            <div key={index} className="group cursor-pointer">
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
        </div>
      </div>
    </div>
  );
};

export default NewsBox;
