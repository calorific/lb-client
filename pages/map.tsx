import { useRef, useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Nav from "../components/nav";
import Footer from "../components/footer";

const MapPage = ({ benches }) => {
    const mapboxgl = require("mapbox-gl");
    const mapbox_key = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    mapboxgl.accessToken = mapbox_key;
    const mapContainerRef = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const zoom = 15;

    function getLocation() {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLng(position.coords.longitude);
          setLat(position.coords.latitude);
        });
    }

    useEffect(() => {
      getLocation();
      const map = new mapboxgl.Map({
        container: mapContainerRef.current || "",
        style: "mapbox://styles/mapbox/outdoors-v11",
        center: [lng, lat],
        attributionControl: false,
        zoom: zoom,
      });

      /*        map.on('load', function() {
            map.addSource("points", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {for bench in benches {
                      {
                    // feature for Mapbox DC
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [bench.lat, bench.lng],
                    },
                    properties: {
                      title: bench.title,
                    },
                  },
                  }}
                    
                ],
              },
            });
        });*/
    }, [lng, lat, zoom]);

    return (
      <div>
        <Head>
          <title>Lunchbench - Map</title>
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <div>
          <Nav></Nav>
          <div>
            <div className="w-auto h-96" ref={mapContainerRef} />
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
}

export async function getStaticProps() {


  const url = process.env.API_URL;
  const res = await axios.get(`${url}/benches`);
  const data = await res.data;
  const benches = data;

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { benches },
    revalidate: 1,
  };
}

export default MapPage;