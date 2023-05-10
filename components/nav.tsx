import AuthDropdown from "@/components/auth/user-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import LightLogo from "@/public/assets/logos/light.svg";
import UserDrawer from "@/components/auth/user-drawer";
import DarkLogo from "@/public/assets/logos/dark.svg";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/mobile-nav";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./search";

export default function Nav() {
  return (
    <>
      <nav className="sticky top-0 flex items-center justify-center bg-gradient-to-b from-primary-200 dark:from-primary-800 from-20% z-50">
        <div className="m-3 sm:mx-6 sm:mt-3 border border-black/10 dark:border-white/10 rounded-xl max-w-[1400px] w-full flex items-center justify-between h-[76px] min-h-[76px] px-2 sm:px-4 md:px-6 backdrop-blur-md bg-white/60 dark:bg-black/60">
          <Link href="/" className="transition-all">
            <Image width={42} height={42} alt="Logo" aria-label="Logo" src={DarkLogo} className="hidden dark:block" />
            <Image width={42} height={42} alt="Logo" aria-label="Logo" src={LightLogo} className="block dark:hidden" />
          </Link>
          <div className="hidden flex-row gap-2 sm:flex">
            <Link href="/">
              <Button variant={"link"} aria-label="Home" size={"sm"}>
                Home
              </Button>
            </Link>
            <Link href="/articles">
              <Button variant={"link"} aria-label="Articles" size={"sm"}>
                Articles
              </Button>
            </Link>
            <Link href="/team">
              <Button variant={"link"} aria-label="Team" size={"sm"}>
                Team
              </Button>
            </Link>
          </div>
          <div>
            <div className="hidden flex-row gap-4 items-center sm:flex">
              <ThemeToggle />
              <AuthDropdown />
            </div>
            <div className="flex flex-row gap-4 items-center sm:hidden">
              <UserDrawer />
              <MobileNav />
            </div>
          </div>
        </div>
        <Search hideButton={true} />
      </nav>
    </>
  );
}
