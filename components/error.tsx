import React from "react";
import Head from "next/head";
import Link from "next/link";
import Nav from "./nav";

const Error = () => {
  return (
    <div>
      <Head>
        <title>Lunchbencher - Error</title>
      </Head>
      <Nav></Nav>
      <div className="text-center text-4xl my-5 mx-5">
        <h3>
          Error - Please return <Link href="/">Home</Link>
        </h3>
      </div>
    </div>
  );
};

export default Error;
