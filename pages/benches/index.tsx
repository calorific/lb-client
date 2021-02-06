import React from "react";
import Link from "next/link";
import Head from "next/head";

const BenchesIndex = () => {
  return (
    <div>
      <Head>
        <title>Lunchbencher</title>
      </Head>
      <Link href="/">
        <h1 className="text-center text-9xl">Home</h1>
      </Link>
    </div>
  );
};

export default BenchesIndex;
