import React from "react";
import Link from "next/link";

// navbar built with tailwind
const Nav = () => {
  return (
    <div className="items-center justify-between flex bg-tertiary bg-opacity-90 shadow-lg px-12 py-4 mx-auto">
      <div className="text-2xl text-black font-semibold inline-flex items-center">
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
