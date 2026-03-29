import React from "react";
import { motion } from "framer-motion";

const NewsBox = ({ news, size = "normal", onClick }) => {
  const baseUrl = import.meta.env.VITE_IMG_URL || "";

  const rawImage =
    news?.thumbnail ||
    news?.image ||
    news?.featuredImage ||
    news?.featured_image ||
    "";

  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${baseUrl}${rawImage}`
    : "";

  // console.log(news, "full news object");
  console.log(rawImage, "raw image");
  console.log(imageUrl, "news box image");

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      {imageUrl ? (
        <img
          src={`${import.meta.env.VITE_IMG_URL}${news.thumbnail}`}
          alt={news?.title || "news image"}
          className={`w-full object-cover rounded-xl mb-4 bg-gray-200 transition-transform group-hover:scale-[1.02] ${
            size === "large" ? "h-96" : size === "medium" ? "h-48" : "h-44"
          }`}
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/600x400?text=No+Image";
          }}
        />
      ) : (
        <div
          className={`w-full rounded-xl mb-4 bg-gray-200 flex items-center justify-center text-gray-500 ${
            size === "large" ? "h-96" : size === "medium" ? "h-48" : "h-44"
          }`}
        >
          {news.title}
        </div>
      )}

      <h3
        className={`font-semibold leading-tight mb-2 group-hover:text-red-700 transition-colors line-clamp-2 ${
          size === "large" ? "text-xl" : "text-base"
        }`}
      >
        {news.title}
      </h3>

      <p className="text-sm text-gray-600 mb-2">
        {news.category?.name || "News"} -{" "}
        {news.createdAt ? new Date(news.createdAt).toLocaleDateString() : ""}
      </p>

      {size === "large" && news.shortDescription && (
        <p className="text-gray-700 line-clamp-2">{news.shortDescription}</p>
      )}
    </motion.div>
  );
};

export default NewsBox;