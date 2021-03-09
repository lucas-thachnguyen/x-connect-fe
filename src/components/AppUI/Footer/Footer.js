import React from "react";
import "./Footer.scss";

function Footer(props) {
  return (
    <footer className="relative bg-white pt-8 pb-6" aria-label="About the author of the website" role="contentinfo">
      <div className="container mx-auto px-4">
        <hr className="my-6 border-gray-400" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 font-semibold py-1">
              Copyright © 2021 CMG Studio
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
