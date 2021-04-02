import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
      <div>
        <Link href="https://vercel.com/?utm_source=lunchbench&utm_campaign=oss">
          <a>
            <img className="vercel" src="vercel.svg" alt="Powered by Vercel" />
          </a>
        </Link>
      </div>
    );
}

export default Footer;