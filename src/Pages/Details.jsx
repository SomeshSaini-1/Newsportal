// import { motion } from "framer-motion";
// import { useParams, Link } from "react-router-dom"; // added Link for better navigation
// import { useState, useEffect } from "react";

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const Details = () => {
//   const { id } = useParams();
//   const [article, setArticle] = useState(null);
//   const [relatedArticles, setRelatedArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchArticleDetails = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(`${API_BASE_URL}/news/${id}`);
//         if (!response.ok) throw new Error("Article not found");

//         const data = await response.json();
//         setArticle(data);

//         if (data?.category?._id) {
//           fetchRelatedArticles(data.category._id, id);
//         }
//       } catch (err) {
//         setError(err.message || "Failed to load article");
//         console.error("Article fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchArticleDetails();
//   }, [id]);

//   const fetchRelatedArticles = async (categoryId, currentId) => {
//     try {
//       const res = await fetch(
//         `${API_BASE_URL}/news?category=${categoryId}&limit=6&status=PUBLISHED`
//       );
//       if (!res.ok) return;

//       const { news = [] } = await res.json();
//       const filtered = news
//         .filter((item) => item._id !== currentId)
//         .slice(0, 3);
//       setRelatedArticles(filtered);
//     } catch (err) {
//       console.error("Related articles fetch failed:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading article...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !article) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
//         <div className="text-center max-w-md">
//           <div className="text-red-600 text-6xl mb-6">⚠️</div>
//           <h2 className="text-2xl sm:text-3xl font-bold mb-3">
//             {error ? "Error Loading Article" : "Article Not Found"}
//           </h2>
//           <p className="text-gray-600 mb-6 text-base sm:text-lg">{error || "The requested article doesn't exist."}</p>
//           <Link
//             to="/"
//             className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition"
//           >
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
//         {/* Header / Title */}
//         <header className="mb-10 sm:mb-12 lg:mb-14">
//           {article.category && (
//             <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
//               {article.category.name || article.category}
//             </span>
//           )}

//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-gray-900">
//             {article.title}
//           </h1>

//           <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm sm:text-base">
//             <span className="font-medium">
//               {article.author || "News Desk"}
//             </span>
//             <span className="hidden sm:inline">•</span>
//             <time dateTime={article.publishedAt || article.createdAt}>
//               {new Date(article.publishedAt || article.createdAt).toLocaleDateString("en-IN", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </time>
//           </div>
//         </header>

//         {/* Featured Image */}
//         {article.thumbnail && (
//           <div className="rounded-2xl overflow-hidden shadow-lg mb-10 sm:mb-12 bg-gray-100">
//             <img
//               src={`${import.meta.env.VITE_IMG_URL}${article.thumbnail}`}
//               alt={article.title}
//               className="w-full h-auto aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] object-cover"
//               loading="eager"
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/1200x675?text=Image+Not+Available";
//               }}
//             />
//           </div>
//         )}

//         {/* Lead / Short Description */}
//         {article.shortDescription && (
//           <p className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed mb-8 sm:mb-10">
//             {article.shortDescription}
//           </p>
//         )}

//         {/* Main Content – using prose for beautiful typography */}
//         <div className="prose prose-base sm:prose-lg lg:prose-xl prose-red max-w-none text-gray-800">
//           {article.description && (
//             <p className="lead">{article.description}</p>
//           )}
//           <div dangerouslySetInnerHTML={{ __html: article.content }} />
//         </div>
//       </article>

//       {/* Related Articles */}
//       {relatedArticles.length > 0 && (
//         <section className="bg-white border-t border-gray-200 py-12 sm:py-16">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center gap-4 mb-8 sm:mb-10">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                 Related Stories
//               </h2>
//               <div className="flex-1 h-1 bg-red-600"></div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//               {relatedArticles.map((rel, idx) => (
//                 <motion.article
//                   key={rel._id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: idx * 0.1 }}
//                   viewport={{ once: true }}
//                   className="group"
//                 >
//                   <Link to={`/news/${rel._id}`} className="block">
//                     <div className="rounded-xl overflow-hidden shadow-sm mb-4 aspect-[4/3] bg-gray-100">
//                       {rel.thumbnail ? (
//                         <img
//                           src={`${import.meta.env.VITE_IMG_URL}${rel.thumbnail}`}
//                           alt={rel.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                           loading="lazy"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
//                       )}
//                     </div>

//                     <h3 className="font-semibold text-lg sm:text-xl leading-tight mb-2 group-hover:text-red-700 transition-colors line-clamp-2">
//                       {rel.title}
//                     </h3>

//                     <p className="text-sm text-gray-600">
//                       {rel.author || "News Desk"} •{" "}
//                       {new Date(rel.publishedAt || rel.createdAt).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </p>
//                   </Link>
//                 </motion.article>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default Details;









// // import { motion } from "framer-motion";

// // const articles = [
// //   {
// //     id: 1,
// //     title:
// //       "Begums of Bangladesh: When rivals Khaleda Zia & Sheikh Hasina joined hands to topple dictatorship",
// //     author: "Debdutta Chakraborty",
// //     date: "December 30, 2025",
// //     image: "large-placeholder",
// //     description:
// //       "Their much talked about brief alliance, despite differences, helped end nearly a decade of dictatorship under General Ershad in the late 1980s and early 1990s. This rare moment of unity between two fierce political rivals became a turning point in Bangladesh's journey toward democracy.",
// //     content: `In the turbulent political landscape of Bangladesh during the 1980s, two women from opposite sides of the political spectrum did something extraordinary — they joined hands to fight a common enemy: military dictatorship.

// // Khaleda Zia, widow of assassinated President Ziaur Rahman and leader of the Bangladesh Nationalist Party (BNP), and Sheikh Hasina, daughter of the country's founding father Bangabandhu Sheikh Mujibur Rahman and chief of the Awami League, put aside their deep-seated rivalry for a greater cause.

// // This short-lived but powerful alliance, popularly remembered as the "Begums' alliance," played a decisive role in the mass uprising that eventually forced General Hussain Muhammad Ershad to step down in December 1990 after nearly nine years of authoritarian rule...`,
// //   },
// //   {
// //     id: 2,
// //     title:
// //       "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
// //     author: "Krishan Murari",
// //     date: "December 30, 2025",
// //     image: "small-placeholder",
// //   },
// //   {
// //     id: 3,
// //     title:
// //       "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
// //     author: "Tina Das",
// //     date: "December 30, 2025",
// //     image: "small-placeholder",
// //   },
// //   {
// //     id: 4,
// //     title:
// //       "Akali Dal turns Mann's 'dinosaur' jibe into comeback campaign. Punjab politics takes 'Jurassic Park' turn",
// //     author: "Chitleen K Sethi",
// //     date: "December 30, 2025",
// //     image: "small-placeholder",
// //   },
// //   {
// //     id: 5,
// //     title:
// //       "Khaleda Zia's death brings back Bangladesh's Minus Two formula. Is it relevant again?",
// //     author: "Analysis Desk",
// //     date: "December 30, 2025",
// //     image: "small-placeholder",
// //   },
// // ];

// // const Details = () => {
// //   // You can change this ID to show any other article as main
// //   const mainArticleId = 1;
// //   const mainArticle = articles.find((article) => article.id === mainArticleId);

// //   const relatedArticles = articles.filter(
// //     (article) => article.id !== mainArticleId
// //   );

// //   if (!mainArticle) {
// //     return <div className="text-center py-20">Article not found</div>;
// //   }

// //   return (
// //     <div className="min-h-screen bg-white">
// //       <div className="max-w-5xl mx-auto px-4 py-12">
// //         {/* Main Article */}
// //         <article className="mb-16">
// //           {/* Large Image */}
// //           <div
// //             className="bg-gray-200 border-2 rounded-xl w-full h-[500px] mb-8 "
// //             style={{
// //               backgroundImage: `url(https://i.dawn.com/large/2026/01/01123757285fa9b.webp)`,
// //             }}
// //           ></div>

// //           <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
// //             {mainArticle.title}
// //           </h1>

// //           <div className="flex items-center gap-4 text-gray-600 mb-8">
// //             <span className="font-medium">{mainArticle.author}</span>
// //             <span>•</span>
// //             <time>{mainArticle.date}</time>
// //           </div>

// //           <p className="text-xl text-gray-800 mb-8 leading-relaxed">
// //             {mainArticle.description}
// //           </p>

// //           <div className="prose prose-lg max-w-none text-gray-800">
// //             <p>{mainArticle.content}</p>
// //             {/* You can add more paragraphs here if you have full content */}
// //           </div>
// //         </article>

// //         {/* Related Articles Section */}
// //         <div className="border-t pt-12">
// //           <div className="bg-gray-50 px-6 py-4 mb-4 flex items-center gap-4">
// //             <h2 className="text-2xl font-bold text-gray-800">
// //               Related Stories
// //             </h2>
// //             <div className="flex-1 h-1 bg-red-700"></div>
// //           </div>

// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {relatedArticles.map((article, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 60 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.6, delay: index * 0.1 }}
// //                 viewport={{ once: true }}
// //                 className="group cursor-pointer transition-transform hover:scale-[1.02]"
// //               >
// //                 <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4 overflow-hidden">
// //                   {/* You can replace with real <img> when you have URLs */}
// //                 </div>
// //                 <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
// //                   {article.title}
// //                 </h3>
// //                 <div className="text-sm text-gray-600">
// //                   {article.author} • {article.date}
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Details;








import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Details = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);

  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  const fetchArticleDetails = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/news/${id}`);
      if (!res.ok) throw new Error("Article not found");

      const data = await res.json();

      setArticle(data);

      if (data?.category?._id) {
        setRelatedArticles([]);
        setPage(1);
        fetchRelatedArticles(data.category._id, 1, true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (categoryId, pageNumber, reset = false) => {
    if (relatedLoading) return;

    setRelatedLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/news?category=${categoryId}&page=${pageNumber}&limit=6&status=PUBLISHED`
      );

      const { news = [] } = await res.json();

      const filtered = news.filter((item) => item._id !== id);

      setRelatedArticles((prev) =>
        reset ? filtered : [...prev, ...filtered]
      );

      if (news.length < 6) {
        setHasMore(false);
      }

      setPage(pageNumber + 1);
    } catch (err) {
      console.error(err);
    }

    setRelatedLoading(false);
  };

  const lastArticleRef = useCallback(
    (node) => {
      if (relatedLoading) return; 

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && article?.category?._id) {
          fetchRelatedArticles(article.category._id, page);
        }
      });

      if (node) observer.current.observe(node);
    },
    [relatedLoading, hasMore, page, article]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Error loading article
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-10">

        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

        {article.thumbnail && (
          <img
            src={`${import.meta.env.VITE_IMG_URL}${article.thumbnail}`}
            className="w-full rounded-xl mb-6"
          />
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

      </article>

      {/* Related Articles */}
      <section className="bg-white border-t py-12">

        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-2xl font-bold mb-8">Related Stories</h2>

          <div className="grid md:grid-cols-3 gap-6">

            {relatedArticles.map((rel, index) => {

              if (relatedArticles.length === index + 1) {
                return (
                  <motion.article
                    ref={lastArticleRef}
                    key={rel._id}
                    className="group"
                  >
                    <Link to={`/news/${rel._id}`}>

                      <img
                        src={`${import.meta.env.VITE_IMG_URL}${rel.thumbnail}`}
                        className="rounded-lg mb-3"
                      />

                      <h3 className="font-semibold group-hover:text-red-600">
                        {rel.title}
                      </h3>

                    </Link>
                  </motion.article>
                );
              }

              return (
                <motion.article key={rel._id} className="group">

                  <Link to={`/news/${rel._id}`}>

                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${rel.thumbnail}`}
                      className="rounded-lg mb-3"
                    />

                    <h3 className="font-semibold group-hover:text-red-600">
                      {rel.title}
                    </h3>

                  </Link>

                </motion.article>
              );
            })}

          </div>

          {relatedLoading && (
            <p className="text-center mt-6 text-gray-500">
              Loading more articles...
            </p>
          )}

        </div>

      </section>

    </div>
  );
};

export default Details;