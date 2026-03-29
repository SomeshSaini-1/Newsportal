import React, { useState } from "react";
import { Play } from "lucide-react";

const platformStyles = {
  youtube: { bg: "bg-red-600", label: "YouTube" },
  instagram: { bg: "bg-pink-500", label: "Instagram" },
  facebook: { bg: "bg-blue-600", label: "Facebook" },
};

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

const Newsvideo = ({ video, onClick }) => {
  const [play, setPlay] = useState(false);

  const embed = getVideoEmbed(video.youtubeUrl.includes('youtube') ? video.youtubeUrl : video.data?.mediaInfo?.permalink);

  const thumbnail = video?.thumbnail
    ? `${import.meta.env.VITE_IMG_URL}/${video.thumbnail}`
    : embed?.thumbnail ?? null;

  const style = embed ? platformStyles[embed.platform] : null;

  return (
    <div className="cursor-pointer" onClick={onClick}>

      {/* ── Video Container ── */}
      <div className="relative w-full h-[20rem] mb-3 rounded-lg overflow-hidden bg-gray-900">

        {play && embed ? (
          // ✅ use embed.permalink not the raw URL
          <iframe
            src={embed.permalink}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
          />
        ) : (
          <div
            className="relative w-full h-full group"
            onClick={(e) => { e.stopPropagation(); setPlay(true); }}
          >
            {/* Thumbnail */}
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={video?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              // Instagram / Facebook — no thumbnail available
              <div className={`w-full h-full flex flex-col items-center justify-center gap-2 ${style?.bg ?? "bg-gray-700"}`}>
                <Play className="text-white" size={48} />
                <span className="text-white text-sm font-medium">{style?.label}</span>
              </div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 group-hover:scale-110 transition-transform rounded-full flex items-center justify-center shadow-lg">
                <Play fill="white" className="text-white ml-1" size={26} />
              </div>
            </div>

            {/* Platform Badge */}
            {style && (
              <span className={`absolute top-3 left-3 text-xs text-white font-semibold px-2 py-0.5 rounded-full ${style.bg}`}>
                {style.label}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
        {video?.title}
      </h3>
      <p className="text-sm text-gray-500">
        {video?.category?.name || "Video"} •{" "}
        {new Date(video?.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Newsvideo;