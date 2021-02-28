import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
} from "react-instantsearch-dom";

export default function Home() {
  const algolia_key = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
  const searchClient = algoliasearch(
    "ABAI9XLKZH",
    algolia_key!,
  );
  return (
    <div>
      <Head>
        <title>Lunchbench</title>
      </Head>
      <Nav></Nav>
      <div>
        <InstantSearch
          indexName="development_bench"
          searchClient={searchClient}
        >
          <div>
            <SearchBox
              className="bg-gray-100 rounded text-center"
              translations={{ placeholder: "Search for Benches..." }}
            />
          </div>
          <div>
            <Hits hitComponent={Hit} />
          </div>
        </InstantSearch>
      </div>
      <div></div>
    </div>
  );
}

const Hit = ({ hit }) => {
  return (
    <div className="text-center text-2xl mx-5 my-5 p-10 rounded shadow-md overflow-hidden bg-gray-100">
      <Link href={`/b/${hit.slug}`}><h1>{hit.title}</h1></Link>
    </div>
  );
}
