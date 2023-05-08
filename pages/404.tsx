import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [title, setTitle] = useState("");
    useEffect(() => {
        const titles = [
            "Everything's possible for Lava Gang!",
            "This page is in another castle!",
            "Just relax. Time's a little... blurry here.",
            "This place is nothing but minds.",
            "What up son?",
            "Wrong turn?",
        ];

        setTitle(titles[Math.floor(Math.random() * titles.length)]);
    }, []);

    return (
        <>
            <Head>
                <title>Not Found | Icebyte</title>
                <meta name="description" content="This page doesn't exist or you don't have access to it." />

                <meta property="twitter:title" content="Not Found | Icebyte" />
                <meta property="twitter:description" content="This page doesn't exist or you don't have access to it." />
                <meta property="twitter:image" content="/og.png" />

                <meta property="og:title" content="Not Found | Icebyte" />
                <meta property="og:description" content="This page doesn't exist or you don't have access to it." />
                <meta property="og:image" content="/og.png" />
                <meta property="og:url" content="https://icebyte.tygr.dev/404" />
            </Head>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-lg sm:text-xl text-primary-500">404 - Not Found</p>
                        <h1 className="text-2xl font-bold text-center sm:text-3xl">{title}</h1>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Link href="/">
                            <Button variant="shadow" size="sm">
                                Home
                            </Button>
                        </Link>
                        <Link href="/articles">
                            <Button variant="shadow" size="sm">
                                Articles
                            </Button>
                        </Link>
                        <Link href="/team">
                            <Button variant="shadow" size="sm">
                                Team
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}