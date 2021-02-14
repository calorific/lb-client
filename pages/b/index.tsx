import { useEffect } from "react";
import { useRouter } from "next/router";

// Current URL is '/'
function BenchesIndex() {
  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    router.push("/", undefined, { shallow: true });
  }, []);

  useEffect(() => {
    // The counter changed!
  }, [router.query]);
  return null;
}

export default BenchesIndex;

