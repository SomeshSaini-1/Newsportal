

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
      const res = await fetch(`${API_BASE_URL}/hindinews/${id}`);
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
        `${API_BASE_URL}/hindinews?category=${categoryId}&page=${pageNumber}&limit=6&status=PUBLISHED`
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

          <h2 className="text-2xl font-bold mb-8">संबंधित खबरें</h2>

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
                सभी संबंधित कहानियां लोड हो ...
            </p>
          )}

        </div>

      </section>

    </div>
  );
};

export default Details;