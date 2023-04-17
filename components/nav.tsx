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
                            <button>
                                Home
                            </button>
                        </Link>
                        <Link href="/articles">
                            <button>
                                Articles
                            </button>
                        </Link>
                        <Link href="/team">
                            <button>
                                Team
                            </button>
                        </Link>
                    </div>
                    <div>
                        <button className="p-1 px-3 bg-black dark:bg-white text-white dark:text-black rounded-md border border-black dark:border-white hover:bg-white/40 hover:text-black hover:dark:bg-black/40 hover:dark:text-white transition-all duration-300">
                            Log in
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}