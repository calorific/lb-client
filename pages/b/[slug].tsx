import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Nav from "../../components/nav";
import ReactMapGL from "react-map-gl";

const Bench = ({ bench }) => {
  const api = require("@what3words/api");
  api.setOptions({ key: "ZHCEP0DY" });
  const coords = api.convertToCoordinates(bench.location);

  const [viewport, setViewport] = useState({
    width: 1000,
    height: 400,
    latitude: 53,
    longitude: 0,
    zoom: 16,
  });

  return (
    <div>
      <Head>
        <title>Lunchbencher - Bench: {bench.title}</title>
      </Head>
      <Nav></Nav>
      <div className="text-center text-9xl">
        <h1>{bench.title}</h1>
        <br />
        <h2>{bench.category}</h2>
        <br />
        <h2>{bench.condition}</h2>
        <br />
        <h5>{bench.capacity}</h5>
        <br />
        <p>{bench.description}</p>
        <br />
        <div className="content-center">
          <ReactMapGL
            mapStyle="mapbox://styles/mapbox/outdoors-v11"
            mapboxApiAccessToken="pk.eyJ1IjoiZWRhcG0iLCJhIjoiY2tsM29kOWtzMTBvdzMwdDd2b3dtNHYxNiJ9.ZGBau9yxktkf-2G6p57eig"
            {...viewport}
          ></ReactMapGL>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await axios.get("http://localhost:1337/benches");
  const benches = res.data;

  const paths = benches.map((bench) => ({
    params: { slug: bench.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

// for each individual page: get the data for that page
export async function getStaticProps({ params }) {
  const { slug } = params;

  const res = await axios.get(`http://localhost:1337/benches?slug=${slug}`);
  const data = await res.data;
  const bench = data[0];

  return {
    props: { bench },
  };
}

export default Bench;
