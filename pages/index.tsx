import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import DarkLogo from "@/public/assets/logos/dark.svg";
import LightLogo from "@/public/assets/logos/light.svg";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Icebyte</title>
        <meta name="title" content="Icebyte" />
        <meta name="description" content="Icebyte is a brand-spanking new review platform for indie games of all sizes." />

        <meta property="twitter:title" content="Icebyte" />
        <meta property="twitter:description" content="Icebyte is a brand-spanking new review platform for indie games of all sizes." />
        <meta property="twitter:image" content="/og.png" />

        <meta property="og:title" content="Icebyte" />
        <meta property="og:description" content="Icebyte is a brand-spanking new review platform for indie games of all sizes." />
        <meta property="og:image" content="/og.png" />
        <meta property="og:url" content="https://icebyte.tygr.dev" />
      </Head>
      <div className="flex flex-col items-center justify-center gap-4 mt-12 text-center md:flex-row md:mt-24 lg:mt-32 xl:mt-44 2xl:mt-54 xs:gap-2">
        <Image alt="Logo" src={DarkLogo} className="hidden w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 dark:block" />
        <Image alt="Logo" src={LightLogo} className="block w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 dark:hidden" />
        <div className="flex flex-col items-center gap-6 p-4">
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
          <div className="flex flex-col items-center justify-center w-full gap-2 sm:flex-row">
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
    </>
  );
}
