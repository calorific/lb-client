import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Head from "next/head";
import Nav from "../../components/nav";
import mapboxgl from "mapbox-gl";

const Bench = ({ bench }) => {
  // convert what3words location to coordinates
  const api = require("@what3words/api");
  api.setOptions({ key: "ZHCEP0DY" });
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZWRhcG0iLCJhIjoiY2tsM29kOWtzMTBvdzMwdDd2b3dtNHYxNiJ9.ZGBau9yxktkf-2G6p57eig";
  const data = api.convertToCoordinates(bench.location);

  // initialize mapbox values  
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(1);

  // get coordinates from what3words promise
  async function getCoords() {
    const jason = await data;
    setLng(jason.coordinates.lng);
    setLat(jason.coordinates.lat);
    setZoom(15);
  }

    getCoords();

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current || '',
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [lng, lat],
      attributionControl: false,
      zoom: zoom,
    });

    // add marker to map
    const marker = new mapboxgl.Marker({ color: "#94F59B" })
      .setLngLat([lng, lat])
      .addTo(map);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Clean up on unmount
    return () => map.remove();
  }, [lng, lat, zoom]);

  return (
    <div>
      <Head>
        <title>Bench: {bench.title}</title>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Nav></Nav>
      <div className="container mx-auto p-10">
        <div className="max-w-full rounded overflow-hidden shadow-lg flex justify-between">
          <div className="px-6 py-4">
            <div className="font-bold text-5xl mb-2">{bench.title}</div>
            <div className="px-6 pt-4 pb-2">
              <div>
                {" "}
                <span className="inline bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <strong>Category:</strong> {bench.category}
                </span>
                <span className="inline bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <strong>Condition:</strong> {bench.condition}
                </span>
                <span className="inline bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <strong>Capacity:</strong> {bench.capacity}
                </span>
              </div>
              {/*<span>
                <img
                  className="max-h-0.5 rounded-lg shadow-lg mb-3.5"
                  src={process.env.API_URL + bench.images[0].url}
                  alt="Bench"
                ></img>
              </span> */}
            </div>
            <div className="overflow-hidden p-3.5">
              <p className="font-semibold text-gray-700 text-base">
                {bench.description}
              </p>
            </div>
            <br />
          </div>
          <div className="h-96 w-96" ref={mapContainerRef} />
        </div>
      </div>
    </div>
  );
};;

// get paths for each bench
export async function getStaticPaths() {
  const url = process.env.API_URL + "/benches";
  const res = await axios.get(url);
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

  const url = process.env.API_URL;
  const res = await axios.get(`${url}/benches?slug=${slug}`);
  const data = await res.data;
  const bench = data[0];

  return {
    props: { bench },
  };
}

export default Bench;
