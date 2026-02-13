import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Details = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch single article details
  useEffect(() => {
    const fetchArticleDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/news/${id}`);
        const data = await response.json();

          console.log(data)
        if (response.ok) {
          setArticle(data);
          // Optionally fetch related articles by category
          if (data?.category) {
            fetchRelatedArticles(data.category._id, id);
          }
        } else {
          setError(data.message || "Failed to fetch article");
        }
      } catch (err) {
        setError("Failed to connect to server. Please make sure the backend is running.");
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticleDetails();
    }
  }, [id]);

  // Fetch related articles from same category
  const fetchRelatedArticles = async (categoryId, currentArticleId) => {
    try {
      // console.log(`${API_BASE_URL}/news?category=${categoryId}&limit=6`)
      const response = await fetch(`${API_BASE_URL}/news?category=${categoryId}&limit=6`);
      const data = await response.json();

      if (response.ok) {
        // Filter out current article and limit to 3
        const filtered = (data.news || [])
          .filter((item) => item._id !== currentArticleId)
          .slice(0, 3);
        setRelatedArticles(filtered);
      }
    } catch (err) {
      console.error("Error fetching related articles:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Article</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
          <p className="text-gray-600">The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Main Article */}
        <article className="mb-16">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          {/* Large Image */}
          {article.thumbnail && (
            <div className="rounded-xl w-full h-[500px] mb-8 overflow-hidden bg-gray-200">
              <img
                        src={`${import.meta.env.VITE_IMG_URL}${article.thumbnail}`}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.backgroundImage = 'url(https://via.placeholder.com/1200x500?text=News+Image)';
                }}
              />
            </div>
          )}

          {/* Category Badge */}
          {article.category && (
            <div className="mb-4">
              <span className="inline-block bg-red-700 text-white px-4 py-1 rounded-full text-sm font-medium">
                {article.category.name || article.category}
              </span>
            </div>
          )}

          <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            {article.shortDescription}
          </h3>

          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <span className="font-medium">{article.author || "Unknown Author"}</span>
            <span>•</span>
            <time>{new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</time>
          </div>

          {article.description && (
            <p className="text-xl text-gray-800 mb-8 leading-relaxed font-medium">
              {article.description}
            </p>
          )}

          <div className="prose prose-lg max-w-none text-gray-800">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="border-t pt-12">
            <div className="bg-gray-50 px-6 py-4 mb-8 flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Related Stories
              </h2>
              <div className="flex-1 h-1 bg-red-700"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.a
                  key={relatedArticle._id}
                  href={`/news/${relatedArticle._id}`}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer transition-transform hover:scale-[1.02]"
                >
                  <div className="bg-gray-200 rounded-xl w-full h-48 mb-4 overflow-hidden">
                    {relatedArticle.thumbnail && (
                      <img
                        src={`${import.meta.env.VITE_IMG_URL}${relatedArticle.thumbnail}`}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-red-700 transition-colors line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {relatedArticle.author || "Unknown"} • {new Date(relatedArticle.publishedAt || relatedArticle.createdAt).toLocaleDateString()}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;












// import { motion } from "framer-motion";

// const articles = [
//   {
//     id: 1,
//     title:
//       "Begums of Bangladesh: When rivals Khaleda Zia & Sheikh Hasina joined hands to topple dictatorship",
//     author: "Debdutta Chakraborty",
//     date: "December 30, 2025",
//     image: "large-placeholder",
//     description:
//       "Their much talked about brief alliance, despite differences, helped end nearly a decade of dictatorship under General Ershad in the late 1980s and early 1990s. This rare moment of unity between two fierce political rivals became a turning point in Bangladesh's journey toward democracy.",
//     content: `In the turbulent political landscape of Bangladesh during the 1980s, two women from opposite sides of the political spectrum did something extraordinary — they joined hands to fight a common enemy: military dictatorship.

// Khaleda Zia, widow of assassinated President Ziaur Rahman and leader of the Bangladesh Nationalist Party (BNP), and Sheikh Hasina, daughter of the country's founding father Bangabandhu Sheikh Mujibur Rahman and chief of the Awami League, put aside their deep-seated rivalry for a greater cause.

// This short-lived but powerful alliance, popularly remembered as the "Begums' alliance," played a decisive role in the mass uprising that eventually forced General Hussain Muhammad Ershad to step down in December 1990 after nearly nine years of authoritarian rule...`,
//   },
//   {
//     id: 2,
//     title:
//       "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
//     author: "Krishan Murari",
//     date: "December 30, 2025",
//     image: "small-placeholder",
//   },
//   {
//     id: 3,
//     title:
//       "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
//     author: "Tina Das",
//     date: "December 30, 2025",
//     image: "small-placeholder",
//   },
//   {
//     id: 4,
//     title:
//       "Akali Dal turns Mann's 'dinosaur' jibe into comeback campaign. Punjab politics takes 'Jurassic Park' turn",
//     author: "Chitleen K Sethi",
//     date: "December 30, 2025",
//     image: "small-placeholder",
//   },
//   {
//     id: 5,
//     title:
//       "Khaleda Zia's death brings back Bangladesh's Minus Two formula. Is it relevant again?",
//     author: "Analysis Desk",
//     date: "December 30, 2025",
//     image: "small-placeholder",
//   },
// ];

// const Details = () => {
//   // You can change this ID to show any other article as main
//   const mainArticleId = 1;
//   const mainArticle = articles.find((article) => article.id === mainArticleId);

//   const relatedArticles = articles.filter(
//     (article) => article.id !== mainArticleId
//   );

//   if (!mainArticle) {
//     return <div className="text-center py-20">Article not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-5xl mx-auto px-4 py-12">
//         {/* Main Article */}
//         <article className="mb-16">
//           {/* Large Image */}
//           <div
//             className="bg-gray-200 border-2 rounded-xl w-full h-[500px] mb-8 "
//             style={{
//               backgroundImage: `url(https://i.dawn.com/large/2026/01/01123757285fa9b.webp)`,
//             }}
//           ></div>

//           <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
//             {mainArticle.title}
//           </h1>

//           <div className="flex items-center gap-4 text-gray-600 mb-8">
//             <span className="font-medium">{mainArticle.author}</span>
//             <span>•</span>
//             <time>{mainArticle.date}</time>
//           </div>

//           <p className="text-xl text-gray-800 mb-8 leading-relaxed">
//             {mainArticle.description}
//           </p>

//           <div className="prose prose-lg max-w-none text-gray-800">
//             <p>{mainArticle.content}</p>
//             {/* You can add more paragraphs here if you have full content */}
//           </div>
//         </article>

//         {/* Related Articles Section */}
//         <div className="border-t pt-12">
//           <div className="bg-gray-50 px-6 py-4 mb-4 flex items-center gap-4">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Related Stories
//             </h2>
//             <div className="flex-1 h-1 bg-red-700"></div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {relatedArticles.map((article, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="group cursor-pointer transition-transform hover:scale-[1.02]"
//               >
//                 <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4 overflow-hidden">
//                   {/* You can replace with real <img> when you have URLs */}
//                 </div>
//                 <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
//                   {article.title}
//                 </h3>
//                 <div className="text-sm text-gray-600">
//                   {article.author} • {article.date}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;
