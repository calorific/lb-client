import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  ClearRefinements,
  Pagination,
  NumericMenu
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite.min.css"
        />
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
          <div className="grid items-center grid-cols-3 px-5 py-2 justify-items-center">
            <div>
              <h3>Category</h3>
              <RefinementList attribute="category" />
            </div>
            <div>
              <h3>Condition</h3>
              <RefinementList attribute="condition" />
            </div>
            <div>
              <h3>Capacity</h3>
              <NumericMenu
                attribute="capacity"
                items={[
                  { label: "<= 10", end: 10 },
                  { label: "10 - 100", start: 10, end: 100 },
                  { label: "100 - 500", start: 100, end: 500 },
                  { label: ">= 500", start: 500 },
                ]}
              />
            </div>
          </div>
          <div>
            <ClearRefinements />
          </div>
          <div>
            <Hits hitComponent={Hit} />
            <div className="px-2 py-4" id="pagination">
              <Pagination showLast />
            </div>
          </div>
        </InstantSearch>
      </div>
      <div className="flex w-full py-5">
        <div className="relative justify-self-end algolia-logo">
          <Link href="https://algolia.com">
            <a>
              <img src="algolia.svg" alt="algolia" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

const Hit = ({ hit }) => {
  return (
    <div className="w-full p-10 mx-5 my-5 overflow-hidden text-2xl text-center bg-gray-100 rounded shadow-md">
      <Link href={`/b/${hit.slug}`}>
        <h1>{hit.title}</h1>
      </Link>
      <div>
        <span className="inline px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-red-200 rounded-full">
          <strong>Category:</strong> {hit.category}
        </span>
        <span className="inline px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-blue-200 rounded-full">
          <strong>Condition:</strong> {hit.condition}
        </span>
        <span className="inline px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-green-200 rounded-full">
          <strong>Capacity:</strong> {hit.capacity}
        </span>
        <span className="inline px-3 py-1 mb-2 mr-2 text-sm font-semibold text-white bg-gray-700 rounded-full">
          <strong>
            <Link href={`/edit/${hit.slug}`}>
              <a>Edit</a>
            </Link>
          </strong>
        </span>
      </div>
    </div>
  );
}