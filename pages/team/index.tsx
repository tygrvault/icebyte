import Head from "next/head";

export default function TeamPage() {
    return (
        <>
            <Head>
                <title>Team | Icebyte</title>
                <meta name="title" content="Team | Icebyte" />
                <meta name="description" content="The infoboard of the team here at Icebyte." />

                <meta property="twitter:title" content="Team | Icebyte" />
                <meta property="twitter:description" content="The infoboard of the team here at Icebyte." />
                <meta property="twitter:image" content="/og.png" />

                <meta property="og:title" content="Team | Icebyte" />
                <meta property="og:description" content="The infoboard of the team here at Icebyte." />
                <meta property="og:image" content="/og.png" />
                <meta property="og:url" content="https://icebyte.tygr.dev/team" />
            </Head>
        </>
    )
}