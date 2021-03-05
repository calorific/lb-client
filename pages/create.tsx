import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const CreatePage = () => {
  const mapboxgl = require("mapbox-gl");
  const mapbox_key = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  mapboxgl.accessToken = mapbox_key;

  // initialize mapbox values
  const mapContainerRef = useRef(null);
  const zoom = 0;

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current || "",
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [0, 0],
      attributionControl: false,
      zoom: zoom,
    });

    // Initialize geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Search...",
      collapsed: true,
    });

    // Add geocoder
    map.addControl(geocoder);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // After the map style has loaded on the page,
    // add a source layer and default styling for a single point
    map.on("load", function () {
      map.addSource("single-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.addLayer({
        id: "point",
        source: "single-point",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#448ee4",
        },
      });

      // Listen for the `result` event from the Geocoder
      // `result` event is triggered when a user makes a selection
      //  Add a marker at the result's coordinates
      geocoder.on("result", function (e) {
        map.getSource("single-point").setData(e.result.geometry);
      });
    });

    // Clean up on unmount
    return () => map.remove();
  }, [zoom]);

  const url = process.env.API_URL;
  return (
    <div>
      <Head>
        <title>Lunchbench - Create</title>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css"
          type="text/css"
        />
      </Head>
      <div>
        <Nav></Nav>
        <div className="grid grid-cols-1 gap-6 py-5 px-5">
          <form action={`${url}/benches`} method="post">
            <div className="block">
              <label className="text-gray-700 text-xl font-semibold">
                Title
              </label>
              <input
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                type="text"
                name="title"
              />
            </div>
            <div className="block">
              <label className="text-gray-700 text-xl font-semibold">
                Description
              </label>
              <textarea
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                name="description"
              />
            </div>
            <div className="block">
              <label className="text-gray-700 text-xl font-semibold">
                Category
              </label>
              <select
                name="category"
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              >
                <option value="bench">Bench</option>
                <option value="spot">Spot</option>
                <option value="area">Area</option>
              </select>
            </div>
            <div className="block">
              <label className="text-gray-700 text-xl font-semibold">
                Condition
              </label>
              <select
                name="condition"
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              >
                <option value="spiffing">Spiffing</option>
                <option value="okay">Okay</option>
                <option value="appalling">Appalling</option>
              </select>
            </div>
            <br />
            <div className="h-96 w-auto" ref={mapContainerRef} />
            <br />
            <button
              className="bg-primary block rounded border-gray-700 text-xl py-1 px-5 w-full"
              type="submit"
            >
              Create Bench
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
