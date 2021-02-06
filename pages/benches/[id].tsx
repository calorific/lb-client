import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const Bench = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>Lunchbencher - Bench: {id}</title>
      </Head>
      <div className="text-center text-9xl">
        <h1>Bench ID: {id}</h1>
      </div>
    </div>
  );
};

export default Bench;
