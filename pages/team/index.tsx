
import { Github, Linkedin } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

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
            <div className="flex flex-col items-center justify-center w-full gap-8 my-12 sm:gap-6 md:gap-4 lg:gap-2 md:my-16 lg:my-24 xl:my-32 2xl:my-40">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold">Team</h1>
                    <p className="text-primary-500">
                        All of our team here at Icebyte.
                    </p>
                </div>
                <div className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 max-w-[1400px]">
                    <div className="flex flex-col w-full border rounded-lg lg:flex-row border-black/10 dark:border-white/10 dark:bg-primary-700/50">
                        <div className="basis-1/2">
                            <img src={"/assets/team/tygerxqt.png"} alt={"tygerxqt avatar"} className="object-cover w-full h-full rounded-lg" />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-4 p-6 basis-1/2">
                            <div className="flex flex-row items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <h1 className="text-3xl font-bold">
                                        tygerxqt
                                    </h1>
                                    <small className="text-primary-500">
                                        Lead Developer, Writer
                                    </small>
                                </div>
                                <div className="flex flex-row gap-4">

                                    <Link href="https://github.com/tygerxqt">
                                        <Github className="w-6 h-6" fill="white" />
                                    </Link>
                                    <Link href="https://www.linkedin.com/in/tygerxqt/">
                                        <Linkedin className="w-6 h-6" />
                                    </Link>
                                </div>
                            </div>
                            <p>
                                Hello, I&apos;m the creator and lead writer at Icebyte. I&apos;m a full-stack developer and I&apos;m passionate about gaming, my favorite game is currently &quot;It Steals&quot;. I&apos;m also a huge fan of open-source software, and I love to contribute to projects whenever I can.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col w-full border rounded-lg lg:flex-row border-black/10 dark:border-white/10 dark:bg-primary-700/50">
                        <div className="basis-1/2">

                            <img src={"/assets/team/nyanspaghetti.png"} alt={"tygerxqt avatar"} className="object-cover w-full h-full rounded-lg" />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-4 p-6 basis-1/2">
                            <div className="flex flex-row items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <h1 className="text-3xl font-bold">
                                        NyanSpaghetti
                                    </h1>
                                    <small className="text-primary-500">
                                        Writer
                                    </small>
                                </div>
                                <div className="flex flex-row gap-4">

                                    <Link href="https://github.com/nyanspaghetti">
                                        <Github className="w-6 h-6" fill="white" />
                                    </Link>
                                </div>
                            </div>
                            <p>
                                Hello there! My name is Nyan, and I am a writer for Icebyte. I am passionate about gaming and have been playing games since I was a kid. I love to share my thoughts and opinions on the latest indie games, and I always strive to provide accurate and honest reviews for our readers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}