import type { NextPage } from "next";
import Head from "next/head";
import GenerateRoom from "../components/main";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Webkinz Room Previewer</title>
                <meta name="description" content="Select your combination!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <GenerateRoom />
            </main>
        </>
    );
};

export default Home;
