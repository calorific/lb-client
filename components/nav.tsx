import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mx-auto shadow-2xl">
      <div className="text-2xl text-white font-semibold inline-flex items-center">
        <Link href="/">
          <a>
            <span>Lunchbencher</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
