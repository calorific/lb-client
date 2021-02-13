import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import Nav from "../components/nav";

export default function Home({ benches }) {
  return (
    <div>
      <Head>
        <title>Lunchbencher - Benches</title>
      </Head>
      <Nav></Nav>
      <div>
        <ul>
          {/* loop over the benches and show them */}
          {benches &&
            benches.map((bench) => (
              <li className="text-center text-2xl mx-5 my-5" key={bench.id}>
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
  const res = await axios.get("http://localhost:1337/benches");
  const benches = await res.data;

  return {
    props: { benches },
  };
}

