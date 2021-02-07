import React from "react";
import Head from "next/head";
import Nav from "../components/nav";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Lunchbencher</title>
      </Head>
      <Nav></Nav>
    </div>
  );
};

export default Home;
