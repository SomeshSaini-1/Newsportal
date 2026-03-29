import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Top black navigation bar */}
      <div className="bg-black text-white py-4 px-6 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm md:text-base">
          <a href="https://mediaplushbharat.com" className="hover:underline">MEDIA PLUS BHARAT HINDI</a>
          <a href="https://mediaplusnews.in" className="hover:underline">MEDIA PLUS NEWS ENGLISH</a>
          {/* <a href="#" className="hover:underline">TheNews Speakers Bureau</a>
          <a href="#" className="hover:underline">The School Of Journalism</a> */}
        </div>
      </div>

      {/* Bottom orange copyright & links section */}
      <div className="bg-orange-600 text-white py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <div className="text-center md:text-left">
            Copyright © 2026 Media plus news Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <a href="#" className="hover:underline">About</a>
            {/* <a href="#" className="hover:underline">Code Of Ethics</a> */}
            <a href="#" className="hover:underline">Contact</a>
            {/* <a href="#" className="hover:underline">Synergy</a> */}
            <a href="#" className="hover:underline">Careers</a>
            <a href="/Terms" className="hover:underline">Terms of Use</a>
            <a href="/Privacy" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;