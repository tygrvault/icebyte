import Link from "next/link";
import DarkLogo from "../public/logos/dark.svg";
import LightLogo from "../public/logos/light.svg";
import Image from "next/image";

export default function Nav() {
    return (
        <>
            <nav className="sticky top-0 flex items-center justify-center">
                <div className="mx-6 mt-3 border border-black/10 dark:border-white/10 rounded-xl max-w-[1400px] w-full flex items-center justify-between h-[76px] min-h-[76px] px-6 backdrop-blur-md bg-white/60 dark:bg-black/60">
                    <Link href="/" className="transition-all">
                        <Image width={42} height={42} alt="Logo" src={DarkLogo} className="hidden dark:block" />
                        <Image width={42} height={42} alt="Logo" src={LightLogo} className="block dark:hidden" />
                    </Link>
                    <div className="flex flex-row gap-6">
                        <Link href="/">
                            <button className="text-primary-500 hover:text-black hover:dark:text-white transition-colors duration-100">
                                Home
                            </button>
                        </Link>
                        <Link href="/articles">
                            <button className="text-primary-500 hover:text-black hover:dark:text-white transition-colors duration-100">
                                Articles
                            </button>
                        </Link>
                        <Link href="/team">
                            <button className="text-primary-500 hover:text-black hover:dark:text-white transition-colors duration-100">
                                Team
                            </button>
                        </Link>
                    </div>
                    <div>
                        <button className="p-1 px-3 bg-black dark:bg-white text-white dark:text-black rounded-md border border-black dark:border-white hover:bg-white hover:text-black hover:dark:bg-black hover:dark:text-white transition-colors active:bg-black/10 active:dark:bg-white/10 duration-150">
                            Log in
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}