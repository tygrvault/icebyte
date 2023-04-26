import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import DarkLogo from "@/public/assets/logos/dark.svg";
import LightLogo from "@/public/assets/logos/light.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center mt-12 md:mt-24 lg:mt-32 xl:mt-44 2xl:mt-54 xs:gap-2 gap-4 text-center">
        <Image alt="Logo" src={DarkLogo} className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 hidden dark:block" />
        <Image alt="Logo" src={LightLogo} className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 block dark:hidden" />
        <div className="flex flex-col items-center gap-6 p-4">
          <div className="flex flex-col gap-2">
            <small className="sm:text-sm md:text-md lg:text-lg xl:text-lg text-primary-500 translate-y-2">
              Introducing Icebyte...
            </small>
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-extrabold">
              Build by nerds, for nerds.
            </h1>
            <p className="sm:text-md md:text-md lg:text-xl xl:text-2xl text-primary-500">
              Icebyte is a brand-spanking new review platform for indie games of all sizes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full justify-center">
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
