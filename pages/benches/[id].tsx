import React from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "../../components/nav";
import Error from "../../components/error";

const Bench = ({ bench, error }) => {
  const router = useRouter();
  const { id } = router.query;
  if (error) {
    return (
      <div>
        <Error error="Object Error"></Error>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Lunchbencher - Bench: {id}</title>
      </Head>
      <Nav></Nav>
      <div className="text-center text-9xl">
        {bench.map((title) => (
          <h1>{title}</h1>
        ))}
      </div>
    </div>
  );
};

Bench.getInitialProps = async () => {
  try {
    const router = useRouter();
    const id = router.query.id;
    const url = "http://localhost:1337/benches/" + id;
    const res = await axios.get(url);
    const bench: string[] = res.data;
    return { bench };
  } catch (error) {
    return { error };
  }
};

export default Bench;
