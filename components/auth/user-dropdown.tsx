"use client";

import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, FileText, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AuthDialog from "@/components/auth/auth-dialog";
import { useAuth } from "@/components/auth/context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function UserDropdown() {
    const { user, avatar, banner, logOut } = useAuth();

    return (
        <>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                        <Avatar className="border border-black/10 dark:border dark:border-white/10">
                            <AvatarImage src={avatar} alt="Avatar" aria-label="Avatar" />
                            <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[22rem] p-0">
                        <AspectRatio ratio={2 / 1}>
                            {!user.verified && (
                                <div className="h-[32px] w-full absolute z-[51] top-0 bg-[#EBCB8B] text-black dark:text-black">
                                    <div className="flex flex-row items-center justify-start gap-2 max-h-[32px] p-2">
                                        <AlertTriangle className="w-4 h-4" />
                                        <p className="text-sm font-semibold">Please check your email for a verification link.</p>
                                    </div>
                                </div>
                            )}
                            <Image src={banner} width={350} height={175} alt="banner" className="object-cover w-full h-full" />
                        </AspectRatio>
                        <DropdownMenuLabel className="flex flex-col px-3 h-16 text-xl font-semibold -translate-y-16 min-h-20">
                            <Avatar className="mb-2 w-20 h-20 border border-black/10 dark:border-white/10">
                                <AvatarImage src={avatar} aria-label="User Avatar" alt="Avatar" />
                                <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <span className="text-black dark:text-white">
                                        {user.name}
                                    </span>
                                </div>
                                <div>
                                    {/* Badges go here */}
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <Link href="/profile">
                            <DropdownMenuItem>
                                <User className="mr-2 w-4 h-4" />
                                <span>
                                    Profile
                                </span>
                            </DropdownMenuItem>
                        </Link>

                        <Link href="/account">
                            <DropdownMenuItem>
                                <FileText className="mr-2 w-4 h-4" />
                                <span>
                                    Account
                                </span>
                            </DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem onClick={() => logOut()}>
                            <LogOut className="mr-2 w-4 h-4" />
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