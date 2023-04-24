"use client";

import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, Cog, FileText, LogOut, Mail, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AuthDialog from "@/components/auth/auth-dialog";
import { useAuth } from "@/components/auth/context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import pb from "@/lib/pocketbase";
import { toast } from "sonner";

export default function UserDropdown() {
    const { user, avatar, banner, logOut } = useAuth();
    const router = useRouter();

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
                            {!user.verified && (
                                <div className="h-[32px] w-full absolute z-[51] top-0 bg-[#EBCB8B] text-black dark:text-black">
                                    <div className="flex flex-row items-center justify-start gap-2 max-h-[32px] p-2">
                                        <AlertTriangle className="w-4 h-4" />
                                        <p className="text-sm font-semibold">To continue, verify your email address.</p>
                                    </div>
                                </div>
                            )}
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
                                    {/* Badges go here */}
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled={!user.verified} onClick={() => router.push("/profile")}>
                            <User className="w-4 h-4 mr-2" />
                            <span>
                                Profile
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={!user.verified} onClick={() => router.push("/account")}>
                            <FileText className="w-4 h-4 mr-2" />
                            <span>
                                Account
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled={!user.verified} onClick={() => router.push("/settings")}>
                            <Cog className="w-4 h-4 mr-2" />
                            <span>
                                Settings
                            </span>
                        </DropdownMenuItem>
                        {!user.verified && (
                            <DropdownMenuItem onClick={() => {
                                toast.promise(pb.collection("users").requestVerification(user.email), {
                                    loading: "Sending verification email...",
                                    success: "Verification email sent!",
                                    error: "Failed to send verification email."
                                })
                            }}>
                                <Mail className="w-4 h-4 mr-2" />
                                <span>
                                    Request verification email
                                </span>
                            </DropdownMenuItem>
                        )}
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