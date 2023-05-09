import { Article, allArticles } from "@/.contentlayer/generated";
import ArticleCard from "@/components/articles/article-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { compareDesc } from "date-fns";
import { X } from "lucide-react";
import { Filter } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

export async function getStaticProps() {
    const articles = allArticles.sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
    })
    return { props: { articles } }
}

export default function ArticlesPage({ articles }: { articles: Article[] }) {
    const [query, setQuery] = useState("");

    return (
        <>
            <Head>
                <title>Articles | Icebyte</title>
                <meta name="title" content="Articles | Icebyte" />
                <meta name="description" content="An entire list of Icebyte's articles." />

                <meta property="twitter:title" content="Articles | Icebyte" />
                <meta property="twitter:description" content="An entire list of Icebyte's articles." />
                <meta property="twitter:image" content="/og.png" />

                <meta property="og:title" content="Articles | Icebyte" />
                <meta property="og:description" content="An entire list of Icebyte's articles." />
                <meta property="og:image" content="/og.png" />
                <meta property="og:url" content="https://icebyte.tygr.dev/articles" />
            </Head>
            <div className="flex justify-center items-center py-4 w-full">
                <div className="flex flex-col items-center gap-4 w-full max-w-[1400px]">
                    <div className="flex flex-col items-center w-full">
                        <h1 className="text-4xl font-extrabold">Articles</h1>
                        <p className="text-primary-500">The entire list of all articles on IceByte.</p>
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center px-16 w-full md:px-0 md:w-1/2 lg:w-1/3">
                        <Input placeholder="Search..." className="w-full h-9 min-w-1/3" value={query} onChange={(e) => setQuery(e.target.value)} />
                        <Button size="icon" className="w-9 h-9" disabled={query.length < 1} onClick={() => setQuery("")} aria-label="Clear Query">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 px-4 pt-6 sm:px-6 md:px-8 lg:px-12 xl:px-16 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
                        {articles
                            .filter((article) => article.title.toLowerCase().includes(query.toLowerCase()) || article.summary.toLowerCase().includes(query.toLowerCase()))
                            .map((article) => {
                                return (
                                    <div key={article._id}>
                                        <ArticleCard article={article} />
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}