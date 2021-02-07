import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Nav from "../../components/nav";

const Benches = ({ benches }) => {
  const url = "benches/";
  return (
    <div>
      <Head>
        <title>Lunchbencher - Benches</title>
      </Head>
      <Nav></Nav>
      <ul>
        {benches.map((bench) => (
          <li className="text-center text-2xl mx-5 my-5" key={bench.id}>
            <Link href={url + bench.id.toString()}>{bench.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Benches.getInitialProps = async () => {
  const res = await axios.get("http://localhost:1337/benches");
  const benches: string[] = res.data;
  return { benches };
};

export default Benches;
