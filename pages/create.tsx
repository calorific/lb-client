import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const CreatePage = ({allCategories, allConditions}) => {
  const mapboxgl = require("mapbox-gl");
  const mapbox_key = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  mapboxgl.accessToken = mapbox_key;
  const url = process.env.API_URL + "/benches";
  console.log({allCategories, allConditions});

  const [modifiedData, setModifiedData] = useState({
    name: '',
    description: '',
    category: '',
    condition: '',
    capacity: '',
    location: '',
    coords: [],
  });
  
  const handleChange = ({ target: { name, value } }) => {
    setModifiedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async e => {
    e.preventDefault();

    const response = await axios.post(url, modifiedData);
    console.log(response);
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

    // Initialize geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      collapsed: true,
    });
    
    // Add geocoder
    map.addControl(geocoder);

    // Add navigation and fullscreen controls
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");

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
                value={modifiedData.name}
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
              >
                {allCategories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="block">
              <label className="text-xl font-semibold text-gray-700">
                Condition
              </label>
              <select
                name="condition"
                className="block w-full px-2 py-2 mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
              >
                {allConditions.map((condition) => (
                  <option value={condition}>{condition}</option>
                ))}
              </select>
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

CreatePage.getInitialProps = async ctx => {
  const url = process.env.API_URL;
  const categories = await axios.get(`${url}/categories`);
  const conditions = await axios.get(`${url}/conditions`);
  const { allCategories } = await categories.data;
  const { allConditions } = await conditions.data;
  return { allCategories, allConditions };
}

export default CreatePage;