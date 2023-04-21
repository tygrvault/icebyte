import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "../ui/dropdown-menu";
import { useAuth } from "./context";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Code, Cog, FileText, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import AuthDialog from "./dialog";

export default function AuthDropdown() {
    const { user, avatar, banner, logOut } = useAuth();

    return (
        <>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                        <Avatar className="border border-black/10 dark:border dark:border-white/10">
                            <AvatarImage src={avatar} />
                            <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[20rem] p-0">
                        <AspectRatio ratio={2 / 1}>
                            <img src={banner} alt="banner" className="object-cover w-full h-full" />
                        </AspectRatio>
                        <DropdownMenuLabel className="flex flex-col h-16 px-3 text-xl font-semibold -translate-y-16 min-h-20">
                            <Avatar className="w-20 h-20 mb-2 border border-black/10 dark:border-white/10">
                                <AvatarImage src={avatar} />
                                <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-row items-center justify-between">
                                <div>
                                    <span className="text-black dark:text-white">
                                        {user.name}
                                    </span>
                                </div>
                                <div>
                                    <Code className="w-5 h-5 font-bold text-primary-500" />
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/profile">
                            <DropdownMenuItem>
                                <User className="w-4 h-4 mr-2" />
                                <span>
                                    Profile
                                </span>
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/account">
                            <DropdownMenuItem>
                                <FileText className="w-4 h-4 mr-2" />
                                <span>
                                    Account
                                </span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link href="/settings">
                            <DropdownMenuItem>
                                <Cog className="w-4 h-4 mr-2" />
                                <span>
                                    Settings
                                </span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => logOut()}>
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>
                                Log out
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <AuthDialog>
                    <Button size={"sm"}>Login</Button>
                </AuthDialog>
            )}
        </>
    )
}