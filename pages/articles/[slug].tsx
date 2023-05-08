import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article, allArticles } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { format, parseISO } from "date-fns";
import { GetStaticPaths } from "next";
import readingTime from "reading-time";
import { Mdx } from "@/components/mdx";
import Balancer from "react-wrap-balancer";

export default function Article({ article }: { article: Article }) {
    const MDXContent = useMDXComponent(article.body.code ?? "");

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col max-w-[850px] w-full items-start justify-start pt-4 px-6 pb-6 sm:px-8 sm:pb-8 md:px-12 md:pb-12 lg:px-16 lg:pb-16">
                    <div className="flex-col items-center gap-0 pb-4">
                        <h1 className="text-3xl font-extrabold md:text-4xl lg:text-5xl">
                            <Balancer>
                                {article.title}
                            </Balancer>
                        </h1>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row items-center justify-center gap-2">
                            <Avatar className="items-center w-6 h-6">
                                <AvatarFallback>
                                    {/* {Insert user logic here} */}
                                </AvatarFallback>
                                <AvatarImage>
                                    {/* {Insert user logic here} */}
                                </AvatarImage>
                            </Avatar>
                            <p className="font-semibold text-primary-500">
                                tygerxqt - {format(parseISO(article.date), 'LLLL d, yyyy')}
                            </p>
                        </div>
                        <p className="text-primary-500">
                            {readingTime(article.body.raw).minutes.toPrecision(1)} min read
                        </p>
                    </div>

                    <div className="max-w-[850px] h-auto pt-8">
                        <img src={article.image} alt="Article Image" style={{ objectFit: "cover" }} className="w-full h-full rounded-md max-w-none" />
                    </div>

                    <article className="max-w-none">
                        <Mdx code={article.body.code} />
                    </article>
                </div>
            </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = allArticles.map((article) => article.slug)
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async ({ params }: { params: any }) => {
    const article = allArticles.find((article) => article._raw.flattenedPath === params.slug)

    if (!article) {
        return;
    }

    return {
        props: {
            article
        }
    }
};
