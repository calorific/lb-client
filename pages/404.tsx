import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";

const Custom404 = () => {
    return(
        <div>
            <Head>
                <title>Lunchbench - Page Not Found</title>
            </Head>
            <Nav></Nav>
            <div className="px-10 py-10 text-center">
                <h1 className="text-5xl">404 - Page Not Found</h1>
                <br/>
                <p className="text-2xl">Please return <Link href="/"><a>Home</a></Link></p>
            </div>
        </div>
    )
}

export default Custom404;