import Link from "next/link";
import DarkLogo from "@/public/assets/logos/dark.svg";
import LightLogo from "@/public/assets/logos/light.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AuthDropdown from "./auth/dropdown";
import { ThemeToggle } from "./theme-toggle";

export default function Nav() {
  return (
    <>
      <nav className="sticky top-0 flex items-center justify-center">
        <div className="mx-6 mt-3 border border-black/10 dark:border-white/10 rounded-xl max-w-[1400px] w-full flex items-center justify-between h-[76px] min-h-[76px] px-6 backdrop-blur-md bg-white/60 dark:bg-black/60">
          <Link href="/" className="transition-all">
            <Image width={42} height={42} alt="Logo" src={DarkLogo} className="hidden dark:block" />
            <Image width={42} height={42} alt="Logo" src={LightLogo} className="block dark:hidden" />
          </Link>
          <div className="flex flex-row gap-2">
            <Link href="/">
              <Button variant={"link"} size={"sm"}>
                Home
              </Button>
            </Link>
            <Link href="/articles">
              <Button variant={"link"} size={"sm"}>
                Articles
              </Button>
            </Link>
            <Link href="/team">
              <Button variant={"link"} size={"sm"}>
                Team
              </Button>
            </Link>
          </div>
          <div className="flex flex-row items-center gap-4">
            <ThemeToggle />
            <AuthDropdown />
          </div>
        </div>
      </nav>
    </>
  );
}
