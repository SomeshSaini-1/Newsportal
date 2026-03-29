import React, { useEffect, useState } from "react";
import {
  Home,
  Instagram,
  MonitorPlay,
  Newspaper,
  Search,
  Youtube,
  Menu,
  X,
} from "lucide-react";
import { BsTelegram } from "react-icons/bs";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleCategoryClick = (category, id) => {
    navigate(`/category/${category}/${id}`);
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories`,
      );
      const data = await response.json();
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const iconLinks = [
    { icon: Instagram, url: "https://www.instagram.com/mediaplus_news/" },
    { icon: Youtube, url: "https://www.youtube.com/@mediaplusnews365" },
    {
      icon: FaFacebook,
      url: "https://www.facebook.com/people/Media-Plus-News/61581540989862/",
    },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/mediaplusnews" },
    { icon: FaTwitter, url: "#" },
    { icon: BsTelegram, url: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      {/* Top Bar - Social + Date + Support */}
      <div className="bg-gray-950 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1480px] mx-auto flex flex-wrap items-center justify-between text-sm gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            {iconLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              );
            })}
            <span className="hidden md:inline ml-3 text-gray-400 text-xs lg:text-sm">
              {currentDate}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.google.com/preferences/source?q=mediaplusnews.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-xs sm:text-sm underline-offset-2 hover:underline"
            >
              Preferred on Google
            </a>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded font-semibold text-xs sm:text-sm transition-colors">
              Support Us
            </button>
          </div>
        </div>
      </div>

      {/* Logo Area */}
      <div className="border-b border-gray-800 bg-white px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
        <div className="max-w-[1480px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo_hi.jpeg"
              alt="Media Plus News"
              className="h-14 sm:h-20 lg:h-24 w-auto object-contain"
            />
          </Link>

          {/* Marquee - hidden on small screens */}
          {/* <div className="hidden lg:flex flex-1 items-center justify-center mx-6">
            <div className="overflow-hidden flex-1 max-w-2xl">
              <p className="text-sm text-gray-300 animate-marquee whitespace-nowrap">
                विश्वभर से नवीनतम अपडेट • मीडिया प्लस न्यूज़ से अवगत रहें •
              </p>
            </div>
          </div> */}

          {/* Marquee - hidden on small screens */}
          <div className="hidden lg:flex flex-col flex-1 items-center justify-center mx-6 overflow-hidden">
            {/* Line 1: Scrolling Red Line */}
            <div className="w-full overflow-hidden whitespace-nowrap">
              <p className="inline-block text-sm text-red-500 font-bold animate-marquee">
                सत्य का सार, निष्पक्ष विचार - राष्ट्र के प्रति अटूट समर्पण।
                मीडिया प्लस भारत।
              </p>
            </div>

            {/* Line 2: Flashing Blue Line */}
            <div className="w-full text-center">
              <p className="text-sm text-blue-600 animate-flash">
                सच के लिए निष्पक्ष पत्रकारिता, राष्ट्र के प्रति अटूट समर्पण।
                भ्रष्टाचार की शिकायत या गुप्त सूचना के लिए हमसे संपर्क करें:
                9694455661
              </p>
            </div>
          </div>

          <Link to={`${import.meta.env.VITE_API_Translate}`}>
            <img
              src="/translatelogo.png"
              className="h-14 rounded-xl p-2 rounded-lg hover:bg-gray-800 cursur-pointer"
            />
          </Link>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-black border-b border-gray-800">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6">
          {/* Desktop + Tablet nav */}
          <div className="hidden lg:flex items-center justify-between py-3.5">
            {/* Categories - horizontal scroll */}
            <div className="flex-1 overflow-x-auto no-scrollbar">
              <ul className="flex items-center whitespace-nowrap gap-4 md:gap-6 text-sm font-semibold uppercase tracking-wide">
                <li
                  className="cursor-pointer hover:text-orange-500 transition-colors flex items-center gap-1.5"
                  onClick={() => navigate("/")}
                >
                  <Home size={18} /> होम
                </li>

                {categories.map((cat) => (
                  <li
                    key={cat._id}
                    className="cursor-pointer hover:text-orange-500 transition-colors"
                    onClick={() => handleCategoryClick(cat.hi_name, cat._id)}
                  >
                    {cat.hi_name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2 lg:gap-4 pl-4 border-l border-gray-700">
              <Link
                to="/videos"
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition group"
              >
                <MonitorPlay
                  className="text-gray-400 group-hover:text-red-500"
                  size={18}
                />
                <span className="text-sm">वीडियो</span>
              </Link>

              <Link
                to="/enews"
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition group"
              >
                <Newspaper
                  className="text-gray-400 group-hover:text-blue-500"
                  size={18}
                />
                <span className="text-sm">ई पेपर</span>
              </Link>

              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  className="bg-transparent border-b border-gray-600 focus:border-orange-500 outline-none px-3 py-1.5 w-40 lg:w-56 transition-all focus:w-64 text-sm"
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 p-2.5 rounded-r transition-colors"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Mobile Menu - dropdown style */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 px-2 bg-gray-950 border-t border-gray-800">
              <ul className="flex flex-col gap-3 text-sm font-medium uppercase">
                <li
                  className="cursor-pointer hover:text-orange-500 transition-colors flex items-center gap-2 py-2 px-3 hover:bg-gray-800 rounded"
                  onClick={() => {
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                >
                  <Home size={20} /> होम
                </li>

                {categories.map((cat) => (
                  <li
                    key={cat._id}
                    className="cursor-pointer hover:text-orange-500 transition-colors py-2 px-3 hover:bg-gray-800 rounded"
                    onClick={() => handleCategoryClick(cat.hi_name, cat._id)}
                  >
                    {cat.hi_name}
                  </li>
                ))}

                <li className="border-t border-gray-700 pt-3 mt-2">
                  <Link
                    to="/videos"
                    className="flex items-center gap-3 py-2 px-3 hover:bg-gray-800 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MonitorPlay size={20} className="text-red-500" /> वीडियो
                  </Link>
                </li>

                <li>
                  <Link
                    to="/enews"
                    className="flex items-center gap-3 py-2 px-3 hover:bg-gray-800 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Newspaper size={20} className="text-blue-500" /> ई पेपर
                  </Link>
                </li>

                {/* Search in mobile menu */}
                <li className="px-3 pt-2">
                  <form onSubmit={handleSearch} className="flex">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search news..."
                      className="flex-1 bg-transparent border border-gray-600 focus:border-orange-500 rounded-l px-4 py-2.5 text-sm outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700 px-4 rounded-r transition-colors"
                    >
                      <Search size={20} />
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Nav;
