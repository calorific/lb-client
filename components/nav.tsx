import React from "react";
import Link from "next/link";

// navbar built with tailwind
const Nav = () => {
  return (
    <div className="flex px-12 py-4 mx-auto text-2xl font-semibold text-black shadow-lg bg-tertiary bg-opacity-90">
      <div className="order-first mr-auto">
        <Link href="/">
          <a>
            <span>
              <img className="h-8" src="lunchbench.png" alt="Lunchbench" />
            </span>
          </a>
        </Link>
      </div>
      <div className="order-last px-2 py-1 ml-auto text-base rounded bg-primary">
        <Link href="/create">
          <a>+ Create</a>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
