import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article, allArticles } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { GetStaticPaths } from "next";
import readingTime from "reading-time";
import { Mdx } from "@/components/mdx";
import Balancer from "react-wrap-balancer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Clipboard, Twitter, Trash, AlertTriangle } from "lucide-react";
import pb from "@/lib/pocketbase";
import { useAuth } from "@/components/auth/context";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Comment from "@/types/Comment";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Article({ article }: { article: Article }) {
    const { loggedIn, user } = useAuth();

    const [comments, setComments] = useState<Comment[]>();
    const [loading, setLoading] = useState(true);

    const [comment, setComment] = useState("");

    useEffect(() => {
        pb.collection("comments").getFullList<Comment>({ sort: "-created", filter: `article_id="${article._id}"`, expand: "author" }).then((res) => {
            setComments(res);
            setLoading(false);
        }).catch((err) => {
            console.log(JSON.stringify(err));
            setLoading(false);
        });
    }, [article._id, loading]);

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
                            <Avatar className="items-center w-8 h-8">
                                <AvatarFallback>
                                    T
                                </AvatarFallback>
                                <AvatarImage src={"https://auth.icebyte.tygr.dev/api/files/_pb_users_auth_/ckw9io313y2iv5e/img_1272_XRNXpg4qgI.jpeg?token="} />
                            </Avatar>
                            <p className="font-semibold text-primary-500">
                                tygerxqt - {format(parseISO(article.date), 'LLLL d, yyyy')}
                            </p>
                        </div>
                        <p className="text-primary-500">
                            {readingTime(article.body.raw).minutes.toPrecision(1)} min read
                        </p>
                    </div>

                    <div className="max-w-[850px] w-full h-auto pt-8">
                        <Image src={article.image} alt="Article Image" style={{ objectFit: "cover" }} width={850} height={0} className="w-full h-full rounded-md max-w-none" />
                    </div>

                    <article className="max-w-none">
                        <Mdx code={article.body.code} />
                    </article>

                    <hr className="w-full my-6 border border-black/10 dark:border-white/10" />

                    <div className="flex flex-col w-full gap-8">
                        <div className="flex flex-col items-center justify-between xs:flex-row">
                            <div className="flex flex-row items-center justify-start gap-4 px-4 py-2 rounded-lg">
                                <Avatar className="w-14 h-14 ">
                                    <AvatarFallback>T</AvatarFallback>
                                    <AvatarImage src="https://avatars.githubusercontent.com/u/59417077?v=4" />
                                </Avatar>
                                <div className="flex flex-col ">
                                    <h3 className="text-lg font-semibold">
                                        Written by Ty Mason
                                    </h3>
                                    <a href="https://twitter.com/tygerxqt" className="text-primary-400">
                                        Learn more →
                                    </a>
                                </div>
                            </div>

                            <div className="flex-row items-center justify-center hidden gap-2 p-2 rounded-lg xs:flex">
                                <Link href={`https://twitter.com/intent/tweet?text=Check out this awesome article I just read: ${process.env.NEXT_PUBLIC_URL + article.slug}`} target="_blank">
                                    <Button size="icon" variant="ghost">
                                        <Twitter />
                                    </Button>
                                </Link>
                                <Button size="icon" variant="ghost" onClick={() => {
                                    toast.success("Copied to clipboard!")
                                    navigator.clipboard.writeText("https://icebyte.tygr.dev" + article.slug)
                                }}>
                                    <Clipboard />
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-4">
                            {user && !user.verified && (
                                <div className="flex flex-row justify-center bg-[#EBCB8B] rounded-md text-black">
                                    <div className="flex flex-row items-center justify-start gap-2 p-2">
                                        <AlertTriangle className="w-4 h-4" />
                                        <p className="text-sm font-semibold">To post comments, you&apos;ll need verify your account.</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-row items-center justify-center gap-2">
                                <Input className="h-9 max-w-none" placeholder={loggedIn ? "Leave a comment..." : "Please log in to comment on articles"} disabled={user ? user.verified ? false : true : true} value={comment} onChange={(e) => setComment(e.target.value)} />
                                <Button size="icon" className="h-9 w-9" disabled={user ? user.verified ? false : true : true} onClick={() => {
                                    if (comment.length < 1) {
                                        return toast.error("Something went wrong!", {
                                            description: "Please enter a comment before attempting to post.",
                                        });
                                    }

                                    pb.collection("comments").create({
                                        article_id: article._id,
                                        author: user?.id,
                                        body: comment,
                                    }).then((res) => {
                                        setComment("");
                                        setLoading(true);
                                        toast.success("Success!", {
                                            description: "Your comment has been posted!"
                                        });
                                    }).catch((err) => {
                                        toast.error("Something went wrong!", {
                                            description: "Your comment couldn't be posted. Check the console for more information."
                                        });
                                        console.log(JSON.stringify(err));
                                    });
                                }}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {comments ? (
                                <>
                                    {comments.map((comment: Comment) => {
                                        return (
                                            <div key={comment.id} className="flex flex-row justify-between w-full p-2 rounded-md bg-primary-700/50">
                                                <div className="flex flex-row items-center gap-3">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarFallback>{comment.expand.author.name.slice(0, 1)}</AvatarFallback>
                                                        <AvatarImage src={process.env.NEXT_PUBLIC_AUTH_URL + "/api/files/_pb_users_auth_/" + comment.expand.author.id + "/" + comment.expand.author.avatar} />
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <p className="font-semibold text-primary-300">
                                                            {comment.expand.author.username}
                                                        </p>
                                                        <p>{comment.body}</p>
                                                    </div>
                                                </div>
                                                {user && comment.expand.author.id === user.id && (
                                                    <Button size="icon" variant="ghost" onClick={() => {
                                                        pb.collection("comments").delete(comment.id).then((res) => {
                                                            setLoading(true);
                                                            toast.success("Success!", {
                                                                description: "Your comment has been deleted!"
                                                            });
                                                        }).catch((err) => {
                                                            toast.error("Something went wrong!", {
                                                                description: "Your comment couldn't be deleted. Check the console for more information."
                                                            });
                                                            console.log(JSON.stringify(err));
                                                        });
                                                    }}>
                                                        <Trash />
                                                    </Button>
                                                )}
                                            </div>
                                        )
                                    })}
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col items-center justify-center w-full gap-8 text-center">
                                        <p>{loading ? "Loading..." : "Failed to fetch comments."}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
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
