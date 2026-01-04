
import React from 'react';
import { Home, Instagram, Search, Youtube } from 'lucide-react';
import { BsTelegram } from 'react-icons/bs';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const rajasthanDistricts = [
  "Ajmer", "Alwar", "Balotra", "Banswara", "Baran", 
  "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", 
  "Bundi", "Chittorgarh", "Churu", "Dausa", "Deeg", 
  "Dholpur", "Didwana-Kuchaman", "Dungarpur", "Hanumangarh", "Jaipur", 
  "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", 
  "Karauli", "Khairthal-Tijara", "Kota", "Kotputli-Behror", "Nagaur", 
  "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar", 
  "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", 
  "Udaipur"
];

// Optional: split into more popular + others
const popularDistricts = ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Jaisalmer"];

const Nav = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-black text-white py-2 px-4 md:px-8 flex flex-wrap items-center justify-between text-sm">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {[Youtube, FaTwitter, Instagram, FaFacebook, BsTelegram, FaLinkedin].map((Icon, i) => (
            <a 
              key={i}
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 p-1.5 rounded transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <span className="ml-3 sm:ml-6 text-gray-400 hidden sm:inline">
            {currentDate}
          </span>
        </div>  

        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <a 
            href="https://www.google.com/preferences/source?q=otplai.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 hover:text-white hover:underline text-xs sm:text-sm"
          >
            Preferred on Google
          </a>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded font-bold text-sm transition-colors">
            Support Us
          </button>
        </div>
      </div>

      {/* Logo */}
      <div className="text-center sm:text-left px-6 md:px-20 py-6 md:py-8 border-b border-gray-800">
        <Link to="/" className="text-5xl sm:text-6xl font-black text-orange-600 tracking-tighter">
          The News
        </Link>
      </div>

      {/* Navigation - Sticky */}
      <nav className="bg-black text-white border-b border-gray-800 z-50">
        <div className="max-w-[1480px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Left + scrollable categories */}
            <div className="flex-1 overflow-x-auto no-scrollbar py-3.5">
              <ul className="flex items-center whitespace-nowrap space-x-3 md:space-x-5 text-xs
               md:text-sm font-semibold uppercase tracking-wide">
                <li 
                  className="cursor-pointer hover:text-orange-500 transition-colors"
                  onClick={() => navigate('/')}
                >
                  <Home size={18} />
                </li>

                {['ECONOMY', 'POLITICS', 'HEALTH', 'GROUND REPORTS'].map(cat => (
                  <li
                    key={cat}
                    className="cursor-pointer hover:text-orange-500 transition-colors"
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </li>
                ))}

                {/* <li className="border-l border-gray-700 md:pl-7" /> */}

                {/* Popular districts first */}
                {rajasthanDistricts.map(dist => (
                  <li
                    key={dist}
                    className="cursor-pointer hover:text-orange-500 transition-colors"
                    onClick={() => handleCategoryClick(dist)}
                  >
                    {dist}
                  </li>
                ))}

                {/* Other districts in dropdown on mobile / smaller screens */}
                {/* <li className="relative group">
                  <span className="cursor-pointer hover:text-orange-500 transition-colors pl-2">
                    More Districts ▾
                  </span>
                  <div className="absolute  group-hover:block bg-gray-900 border border-gray-700
                   rounded shadow-xl mt-2 py-2 min-w-[240px] max-h-[60vh] overflow-y-auto z-50">
                    {rajasthanDistricts.map(dist => (
                      <button
                        key={dist}
                        className="block w-full text-left px-5 py-2 text-sm hover:bg-gray-800 hover:text-orange-500 transition-colors"
                        onClick={() => handleCategoryClick(dist)}
                      >
                        {dist}
                      </button>
                    ))}
                  </div>
                </li> */}


                {/* {['INDIA', 'WORLD'].map(cat => (
                  <li
                    key={cat}
                    className="cursor-pointer hover:text-orange-500 transition-colors"
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </li>
                ))} */}
              </ul>
            </div>

            {/* Search - always visible */}
            <div className="flex items-center bg-black h-full py-3.5 pl-4 md:pl-6 border-l border-gray-700">
              <input
                type="text"
                placeholder="Search news..."
                className="bg-transparent border-b border-gray-600 focus:border-orange-500 outline-none px-2 py-1 w-32 md:w-40 lg:w-48 transition-all focus:w-64 text-sm"
              />
              <Search className="ml-2 text-gray-400 hover:text-orange-500 cursor-pointer" size={20} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hide scrollbar globally */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Nav;