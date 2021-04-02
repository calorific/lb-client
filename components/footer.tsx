import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
      <div className="flex py-5">
        <div className="justify-self-end footer">
          <Link href="https://algolia.com">
          <a>
            <img src="/algolia.svg" alt="algolia" />
          </a>
        </Link>
        <br/>
        <Link href="https://vercel.com/?utm_source=lunchbench&utm_campaign=oss">
          <a>
            <img className="vercel" src="/vercel.svg" alt="Powered by Vercel" />
          </a>
        </Link>
        </div>
      </div>
    );
}

export default Footer;