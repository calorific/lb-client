import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// navbar built with tailwind
const Nav = () => {
  return (
    <div className="flex bg-tertiary bg-opacity-90 shadow-lg px-12 py-4 mx-auto text-2xl text-black font-semibold">
      <div className="order-first mr-auto">
        <Link href="/">
          <a>
            <span>Lunchbench</span>
          </a>
        </Link>
      </div>
      <div className="order-last ml-auto rounded border-gray-400 text-base">
        <Link href="/create">
          <a>
            <FontAwesomeIcon icon={faPlusCircle} /> Create
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
