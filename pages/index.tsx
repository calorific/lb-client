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
              className="px-2 py-2 text-center rounded"
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
    <div className="p-10 mx-5 my-5 overflow-hidden text-2xl text-center bg-gray-100 rounded shadow-md">
      <Link href={`/b/${hit.slug}`}><h1>{hit.title}</h1></Link>
    </div>
  );
}
