import React, { useRef, useEffect } from 'react';

const trendingNews = [

  {
    title: "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
    author: "Krishan Murari",
    date: "December 30, 2025",
    image: "https://i.ytimg.com/vi/2811QwoB7sc/hq720.jpg", // Protest march in Dehradun
  },
  {
    title: "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
    author: "Tina Das",
    date: "December 30, 2025",
    image: "https://i.redd.it/3w0hsc7madrd1.jpeg", // Vijay vs Prabhas collage/poster style
  },
  {
    title: "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
    author: "Krishan Murari",
    date: "December 30, 2025",
    image: "https://i.ytimg.com/vi/2811QwoB7sc/hq720.jpg", // Protest march in Dehradun
  },
  {
    title: "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
    author: "Tina Das",
    date: "December 30, 2025",
    image: "https://i.redd.it/3w0hsc7madrd1.jpeg", // Vijay vs Prabhas collage/poster style
  },
  {
    title: "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
    author: "Krishan Murari",
    date: "December 30, 2025",
    image: "https://i.ytimg.com/vi/2811QwoB7sc/hq720.jpg", // Protest march in Dehradun
  },
  {
    title: "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
    author: "Tina Das",
    date: "December 30, 2025",
    image: "https://i.redd.it/3w0hsc7madrd1.jpeg", // Vijay vs Prabhas collage/poster style
  },
  {
    title: "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
    author: "Krishan Murari",
    date: "December 30, 2025",
    image: "https://i.ytimg.com/vi/2811QwoB7sc/hq720.jpg", // Protest march in Dehradun
  },
  {
    title: "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
    author: "Tina Das",
    date: "December 30, 2025",
    image: "https://i.redd.it/3w0hsc7madrd1.jpeg", // Vijay vs Prabhas collage/poster style
  }

];

export const Rightbar = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId;
    let scrollAmount = 0;
    const speed = 0.5; // Adjust speed (higher = faster scroll)

    const scroll = () => {
      if (container) {
        scrollAmount += speed;
        container.scrollTop = scrollAmount;

        // Seamless loop: reset to top when reaching bottom
        if (scrollAmount >= container.scrollHeight - container.clientHeight) {
          scrollAmount = 0;
          container.scrollTop = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => (animationId = requestAnimationFrame(scroll));

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <div className="lg:w-96">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-orange-600 mb-4">Trending News</h2>

        {/* Scrollable container with auto-scroll */}
        <div
          ref={scrollRef}
          className="h-96 overflow-hidden hover:overflow-y-auto transition-all duration-300 space-y-6"
        >
          {trendingNews.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-24 object-cover rounded border-2 border-gray-300"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm line-clamp-3">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {item.author} - {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};