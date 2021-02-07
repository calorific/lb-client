import React from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "../../components/nav";

const Bench = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>Lunchbencher - Bench: {id}</title>
      </Head>
      <Nav></Nav>
      <div className="text-center text-9xl">
        <h1>Bench ID: {id}</h1>
      </div>
    </div>
  );
};

Bench.getInitialProps = async () => {
  const res = await axios.get("http://localhost:1337/benches");
  const benches: string[] = res.data;
  return { benches };
};

export default Bench;
