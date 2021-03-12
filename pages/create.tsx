import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "../components/nav";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const CreatePage = () => {
  const mapboxgl = require("mapbox-gl");
  const api = require("@what3words/api");
  const mapbox_key = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const wtw_key = process.env.NEXT_PUBLIC_WTW_API_KEY;
  mapboxgl.accessToken = mapbox_key;
  api.setOptions({ key: wtw_key });
  const url = process.env.API_URL + "/benches";
  const router = useRouter();

  const [modifiedData, setModifiedData] = useState({
    title: '',
    description: '',
    category: 1,
    condition: 1,
    capacity: 0,
    slug: '',
    lng: 0,
    lat: 0,
  });

  const DataRef = useRef(modifiedData);
  
  const handleChange = ({ target: { name, value } }) => {
    setModifiedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumChange = ({ target: { name, value } }) => {
    setModifiedData((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };
  
  const handleSubmit = async e => {
    e.preventDefault();

    setModifiedData(DataRef.current);
    console.log(modifiedData);

    const response = await axios.post(url, modifiedData);
    router.push("/");
  };
  
  // initialize mapbox values
  const mapContainerRef = useRef(null);
  const zoom = 2;
  
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current || "",
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [-0.118092, 51.509865],
      attributionControl: false,
      zoom: zoom,
    });

    setModifiedData((prev) => ({
      ...prev,
      lng: 0,
      lat: 0,
      slug: ''
    }));

    // Initialize geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: {color: "#94F59B"},
    });
    
    // Add geocoder
    map.addControl(geocoder);

    // Add navigation and fullscreen controls
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");

    geocoder.on("result", function (result) {
      setModifiedData((prev) => ({
        ...prev,
        lng: result.result.center[0],
        lat: result.result.center[1],
      }));
      api
        .convertTo3wa({ lat: modifiedData.lat, lng: modifiedData.lng }, "en")
        .then(function (getSlug) {
          setModifiedData((prev) => ({
            ...prev,
            slug: getSlug.words.replace(".", "-").replace(".", "-"),
          }));
        });
    });
    
    // Clean up on unmount
    return () => map.remove();
  }, [zoom]);

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
        <div className="grid grid-cols-1 gap-6 px-5 py-5">
          <form onSubmit={handleSubmit}>
            <div className="block">
              <label className="text-xl font-semibold text-gray-700">
                Title
              </label>
              <input
                className="block w-full px-2 py-2 mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                type="text"
                name="title"
                value={modifiedData.title}
                onChange={handleChange}
              />
            </div>
            <div className="block">
              <label className="text-xl font-semibold text-gray-700">
                Description
              </label>
              <textarea
                className="block w-full px-2 py-2 mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                name="description"
                value={modifiedData.description}
                onChange={handleChange}
              />
            </div>
            <div className="block">
              <label className="text-xl font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                className="block w-full px-2 py-2 mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                onChange={handleChange}
              >
                <option value={1}>Bench</option>
                <option value={2}>Spot</option>
                <option value={3}>Area</option>
                <option value={4}>Park</option>
              </select>
            </div>
            <div className="block">
              <label className="text-xl font-semibold text-gray-700">
                Condition
              </label>
              <select
                name="condition"
                className="block w-full px-2 py-2 mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                onChange={handleChange}
              >
                <option value={1}>Spiffing</option>
                <option value={2}>Okay</option>
                <option value={3}>Appalling</option>
              </select>
            </div>
            <div className="block">
              <label className="text-xl font-semibold text-gray-700">
                Capacity
              </label>
              <input
                className="block w-full px-2 py-2 mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                type="number"
                name="capacity"
                value={modifiedData.capacity}
                onChange={handleNumChange}
              />
            </div>
            <br />
            <div className="w-auto h-96" ref={mapContainerRef} />
            <br />
            <button
              className="block w-full px-5 py-1 text-xl border-gray-700 rounded bg-primary"
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