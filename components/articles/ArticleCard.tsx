import { Article } from "@/.contentlayer/generated"

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <>

            <a tabIndex={0} className="rounded-md relative flex w-full min-h-[550px] border border-black/10 dark:border-white/10 md:hover:-translate-y-1 md:hover:active:translate-y-0 transition-all duration-300" href={article.slug}>
                <div className="flex flex-col flex-auto w-full h-auto p-0 text-left ">
                    <div className="w-full h-full min-w-full overflow-hidden rounded-md ">
                        <img src={article.image} alt="Article Image" className="object-cover w-full h-full" />
                    </div>
                </div>
                <div className="absolute bottom-0 w-full border-t border-black/10 dark:border-white/10 rounded-b-md backdrop-blur-md bg-black/40">
                    <div className="flex flex-col items-start justify-center w-full gap-2 p-4">
                        <div className="flex flex-row items-center justify-between w-full gap-3 ">
                            <h1 className="text-2xl font-bold text-white">
                                {article.title}
                            </h1>
                            <p className="text-primary-100">
                                { } min read
                            </p>
                        </div>
                        <p className="text-primary-200 ">
                            {article.summary.split(" ").slice(0, 20).join(" ") + "..."}
                        </p>
                    </div>
                </div>
            </a>
        </>
    )
}