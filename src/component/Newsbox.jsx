import React from "react";
import {motion} from "framer-motion"


const NewsBox = ({ news, size = 'normal', onClick  }) => {
  const url = import.meta.env.VITE_IMG_URL;
  const imageUrl = `${url}${news.thumbnail}` || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
  // console.log(imageUrl)
  return (
    <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay:  0.8 }}
            viewport={{ once: true }}
            className="group cursor-pointer" onClick={onClick}>

      <div
        className={`bg-gray-200 rounded-xl mb-4 bg-cover bg-center transition-transform group-hover:scale-[1.02] ${
          size === 'large' ? 'h-96' : size === 'medium' ? 'h-48' : 'h-44'
        }`}
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      <h3 className={`font-semibold leading-tight mb-2 group-hover:text-red-700 transition-colors line-clamp-2 ${
        size === 'large' ? 'text-xl' : 'text-base'
      }`}>
        {news.title}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        {news.category?.name || 'News'} - {new Date(news.createdAt).toLocaleDateString()}
      </p>
      {size === 'large' && news.shortDescription && (
        <p className="text-gray-700 line-clamp-2">{news.shortDescription}</p>
      )}
    {/* </div> */}
   
    </motion.div>
  );
};

export default NewsBox;




