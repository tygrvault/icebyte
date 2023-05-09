import { Article } from "contentlayer/generated"
import Image from "next/image"
import readingTime from "reading-time"

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <>
            <a tabIndex={0} className="rounded-md relative flex w-full min-h-[550px] border border-black/10 dark:border-white/10 md:hover:-translate-y-1 md:hover:active:translate-y-0 transition-all duration-300" href={article.slug}>
                <div className="flex flex-col flex-auto w-screen h-auto p-0 text-left ">
                    <div className="w-full h-full min-w-full overflow-hidden rounded-md ">
                        <Image src={article.image} fill alt="Article Image" style={{ objectFit: "cover" }} className="object-cover w-full h-full rounded-md" />
                    </div>
                </div>
                <div className="absolute bottom-0 w-full border-t border-black/10 dark:border-white/10 rounded-b-md backdrop-blur-md bg-black/40">
                    <div className="flex flex-col items-start justify-center w-full gap-2 p-4">
                        <div className="flex flex-row items-center justify-between w-full gap-3 ">
                            <h1 className="text-2xl font-bold text-white">
                                {article.title}
                            </h1>
                            <p className="text-primary-100">
                                {readingTime(article.body.raw).minutes.toPrecision(1)} min read
                            </p>
                        </div>
                        <p className="overflow-hidden text-primary-200 text-ellipsis">
                            {article.summary}
                        </p>
                    </div>
                </div>
            </a>
        </>
    )
}