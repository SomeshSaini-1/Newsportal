const articles = [
  {
    id: 1,
    title:
      "Begums of Bangladesh: When rivals Khaleda Zia & Sheikh Hasina joined hands to topple dictatorship",
    author: "Debdutta Chakraborty",
    date: "December 30, 2025",
    image: "large-placeholder",
    description:
      "Their much talked about brief alliance, despite differences, helped end nearly a decade of dictatorship under General Ershad in the late 1980s and early 1990s. This rare moment of unity between two fierce political rivals became a turning point in Bangladesh's journey toward democracy.",
    content: `In the turbulent political landscape of Bangladesh during the 1980s, two women from opposite sides of the political spectrum did something extraordinary — they joined hands to fight a common enemy: military dictatorship.

Khaleda Zia, widow of assassinated President Ziaur Rahman and leader of the Bangladesh Nationalist Party (BNP), and Sheikh Hasina, daughter of the country's founding father Bangabandhu Sheikh Mujibur Rahman and chief of the Awami League, put aside their deep-seated rivalry for a greater cause.

This short-lived but powerful alliance, popularly remembered as the "Begums' alliance," played a decisive role in the mass uprising that eventually forced General Hussain Muhammad Ershad to step down in December 1990 after nearly nine years of authoritarian rule...`,
  },
  {
    id: 2,
    title:
      "Anjel Chakma death is 'wake-up call'. Students from Northeast no longer feel safe in Dehradun",
    author: "Krishan Murari",
    date: "December 30, 2025",
    image: "small-placeholder",
  },
  {
    id: 3,
    title:
      "Jana Nayagan or Raja Saab? Vijay and Prabhas are heading for a box-office clash",
    author: "Tina Das",
    date: "December 30, 2025",
    image: "small-placeholder",
  },
  {
    id: 4,
    title:
      "Akali Dal turns Mann's 'dinosaur' jibe into comeback campaign. Punjab politics takes 'Jurassic Park' turn",
    author: "Chitleen K Sethi",
    date: "December 30, 2025",
    image: "small-placeholder",
  },
  {
    id: 5,
    title:
      "Khaleda Zia's death brings back Bangladesh's Minus Two formula. Is it relevant again?",
    author: "Analysis Desk",
    date: "December 30, 2025",
    image: "small-placeholder",
  },
];

const Details = () => {
  // You can change this ID to show any other article as main
  const mainArticleId = 1;
  const mainArticle = articles.find((article) => article.id === mainArticleId);

  const relatedArticles = articles.filter(
    (article) => article.id !== mainArticleId
  );

  if (!mainArticle) {
    return <div className="text-center py-20">Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Main Article */}
        <article className="mb-16">
          {/* Large Image */}
          <div
            className="bg-gray-200 border-2 rounded-xl w-full h-[500px] mb-8 "
            style={{
              backgroundImage: `url(https://i.dawn.com/large/2026/01/01123757285fa9b.webp)`,
            }}
          ></div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {mainArticle.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <span className="font-medium">{mainArticle.author}</span>
            <span>•</span>
            <time>{mainArticle.date}</time>
          </div>

          <p className="text-xl text-gray-800 mb-8 leading-relaxed">
            {mainArticle.description}
          </p>

          <div className="prose prose-lg max-w-none text-gray-800">
            <p>{mainArticle.content}</p>
            {/* You can add more paragraphs here if you have full content */}
          </div>
        </article>

        {/* Related Articles Section */}
        <div className="border-t pt-12">

          <div className="bg-gray-50 px-6 py-4 mb-4 flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Related Stories
            </h2>
            <div className="flex-1 h-1 bg-red-700"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArticles.map((article) => (
              <div
                key={article.id}
                className="group cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4 overflow-hidden">
                  {/* You can replace with real <img> when you have URLs */}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                  {article.title}
                </h3>
                <div className="text-sm text-gray-600">
                  {article.author} • {article.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
