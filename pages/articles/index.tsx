import { allArticles } from "@/.contentlayer/generated";
import ArticleCard from "@/components/articles/article-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useState } from "react";

export default function ArticlesPage() {
    const [query, setQuery] = useState("");

    return (
        <>
            <div className="flex items-center justify-center w-full py-4">
                <div className="flex flex-col items-center gap-4 w-full max-w-[1400px]">
                    <div className="flex flex-col items-center w-full">
                        <h1 className="text-4xl font-extrabold">Articles</h1>
                        <p className="text-primary-500">The entire list of all articles on IceByte.</p>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full gap-2 px-16 md:px-0 md:w-1/2 lg:w-1/3">
                        <Input placeholder="Search..." className="w-full h-9 min-w-1/3" value={query} onChange={(e) => setQuery(e.target.value)} />
                        <Button size="icon" className="h-9 w-9">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 px-8 pt-8 lg:px-16 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
                        {allArticles
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