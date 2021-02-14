import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import Nav from "../components/nav";

export default function Home({ benches }) {
  return (
    <div>
      <Head>
        <title>Lunchbencher</title>
      </Head>
      <Nav></Nav>
      <div>
        <ul>
          {/* loop over the benches and show them */}
          {benches &&
            benches.map((bench) => (
              <li className="text-center text-2xl mx-5 my-5 p-10 rounded shadow-lg overflow-hidden" key={bench.id}>
                <Link href={`/b/${bench.slug}`}>
                  <a>{bench.title}</a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // get benches from our api
  const url = process.env.API_URL + "/benches";
  const res = await axios.get(url);
  const benches = await res.data;

  return {
    props: { benches },
  };
}

