import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import DarkLogo from "@/public/assets/logos/dark.svg";
import LightLogo from "@/public/assets/logos/light.svg";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Icebyte</title>
        <meta name="title" content="Icebyte" />
        <meta name="description" content="Icebyte is a brand-spanking new review platform for indie games of all sizes." />

        <meta property="twitter:title" content="Icebyte" />
        <meta property="twitter:description" content="Icebyte is a brand-spanking new review platform for indie games of all sizes." />
        <meta property="twitter:image" content="https://icebyte.tygr.dev/og.png" />

        <meta property="og:title" content="Icebyte" />
        <meta property="og:description" content="Icebyte is a brand-spanking new review platform for indie games of all sizes." />
        <meta property="og:image" content="https://icebyte.tygr.dev/og.png" />
        <meta property="og:url" content="https://icebyte.tygr.dev" />
      </Head>
      <div className="flex flex-col gap-8 justify-center items-center my-12 w-full sm:gap-6 md:gap-4 lg:gap-2 md:my-24 lg:my-32 xl:my-44 2xl:my-54">

        <div className="flex flex-col items-center max-w-[1400px] justify-center gap-4 text-center md:flex-row xs:gap-2">
          <Image alt="Logo" src={DarkLogo} className="hidden w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 dark:block" />
          <Image alt="Logo" src={LightLogo} className="block w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 dark:hidden" />
          <div className="flex flex-col gap-6 items-center p-4">
            <div className="flex flex-col gap-2">
              <small className="translate-y-2 sm:text-sm md:text-md lg:text-lg xl:text-lg text-primary-500">
                Introducing Icebyte...
              </small>
              <h1 className="text-3xl font-extrabold sm:text-4xl md:text-4xl lg:text-6xl">
                Built by nerds, for nerds.
              </h1>
              <p className="sm:text-md md:text-md lg:text-xl xl:text-2xl text-primary-500">
                Icebyte is a brand-spanking new review platform for indie games of all sizes.
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center w-full sm:flex-row">
              <Search />
              <Link href="/articles" className="hidden sm:block">
                <Button theme="secondary" variant="shadow" size="sm">
                  Articles
                </Button>
              </Link>
              <Link href="/team" className="hidden sm:block">
                <Button theme="secondary" variant="shadow" size="sm">
                  Team
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="px-4 max-w-[1200px] sm:px-6 md:px-8 lg:px-16 xl:px-24 flex flex-col items-center justify-between gap-6 md:gap-8 mt-16 sm:mt-18 md:mt-24 text-center md:text-start md:flex-row lg:mt-28 xl:mt-36 xs:gap-4">
          <Balancer>
            <h1 className="text-4xl font-bold sm:text-4xl md:text-5xl lg:text-6xl basis-1/3 sm:text-start">
              But what <i>is</i> IceByte?!
            </h1>
          </Balancer>
          <Balancer>
          <p className="text-center basis-2/3 md:text-end text-primary-600 dark:text-primary-300 sm:text-start">
            Brought you by Nord Studio, IceByte is a brand-spanking-new review platform primarily for games from small to medium sized indie games.
            <br /> <br />
            We created IceByte on our game division to showcase some of our favourite games which have inspired us to keep thinking differently.
          </p>
          </Balancer>
        </div>

        <div className="px-4 max-w-[1200px] sm:px-6 md:px-8 lg:px-16 xl:px-24 flex flex-col items-center justify-between gap-6 mt-16 sm:mt-18 md:mt-24 text-center md:text-start md:flex-row lg:mt-28 xl:mt-36 xs:gap-4">
        <Balancer>
            <h1 className="text-4xl font-bold text-center basis-1/3 md:hidden">
              What&apos;s the <span className="underline"><i>review</i></span> process?
            </h1>
          </Balancer>
          <Balancer>
          <p className="text-center basis-2/3 md:text-start text-primary-600 dark:text-primary-300 sm:text-start">
            A review is broken down into 4 seperate sections / points: World, Gameplay, Music, Story. <br /> <br />
            Each one of these topics are scored out of 25, which leads the maxoumum top score to be 100. These numbered scores can alsobe displayed from grade A being the highest and F being the lowest.
          </p>
          </Balancer>
          <Balancer>
            <h1 className="hidden text-4xl font-bold md:inline-block text-end md:text-5xl lg:text-6xl basis-1/3">
            What&apos;s the <span className="underline"><i>review</i></span> process?
            </h1>
          </Balancer>
        </div>
      </div>
    </>
  );
}
