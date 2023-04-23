"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "./context";
import { Input } from "../ui/input";

export default function AuthDrawer({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const { logIn, register, authStore } = useAuth();

    const [mode, setMode] = useState<"login" | "register" | "reset">("login");

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    {children}
                </DrawerTrigger>
                <DrawerContent position="bottom" size="content" className="p-0 border-t border-black/10 dark:border-white/10" closeButton={true}>
                    <DrawerHeader className="p-4">
                        <DrawerTitle className="flex flex-row items-center justify-center text-4xl font-extrabold">
                            {mode === "login" && "Login"}
                            {mode === "register" && "Register"}
                            {mode === "reset" && "Reset password"}
                        </DrawerTitle>
                        <DrawerDescription>
                            {mode === "login" && "Please log in to your Pixel account."}
                            {mode === "register" && "Register a Pixel account and join the club!"}
                            {mode === "reset" && "Please enter your email address to reset your password."}
                        </DrawerDescription>
                    </DrawerHeader>
                    {/* <hr className="border border-black/10 dark:border-white/10" /> */}
                    <div className="flex flex-col gap-4 p-4">
                        {mode === "login" && (
                            <>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    className="w-full text-md"
                                    onClick={() => logIn(email, password)}
                                >
                                    Submit
                                </Button>
                                <small className="px-2 pt-2 text-center text-primary-500 dark:text-primary-400">
                                    By continuing, you agree to our{" "}
                                    <a className="text-blue-500" href="/tos">
                                        Terms of Service
                                    </a>
                                    {" "} and {" "}
                                    <a className="text-blue-500" href="/privacy">
                                        Privacy Policy
                                    </a>
                                    .
                                </small>
                            </>
                        )}
                        {mode === "register" && (
                            <>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input
                                    id="passwordConfirm"
                                    type="password"
                                    placeholder="Password Confirmation"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Button
                                    className="w-full text-md"
                                    onClick={() =>
                                        register(username, email, password, confirmPassword)
                                    }
                                >
                                    Create Account
                                </Button>
                                <small className="px-2 pt-2 text-center text-primary-500 dark:text-primary-400">
                                    By continuing, you agree to our{" "}
                                    <a className="text-blue-500" href="/tos">
                                        Terms of Service
                                    </a>
                                    {" "}
                                    and
                                    {" "}
                                    <a className="text-blue-500" href="/privacy">
                                        Privacy Policy
                                    </a>
                                    .
                                </small>
                            </>
                        )}
                        {mode === "reset" && (
                            <>
                                <Input id="email" type="email" placeholder="Email" />
                                <Button className="w-full text-md">Send</Button>
                            </>
                        )}
                    </div>
                    <DrawerFooter className="flex p-4 text-center border-t sm:flex-col sm:justify-center border-black/20 dark:border-white/20">
                        {mode === "login" && (
                            <>
                                <span>
                                    Forgot password?{" "}
                                    <Button
                                        variant={"link"}
                                        className="p-0 text-blue-500 dark:text-blue-500"
                                        onClick={() => setMode("reset")}
                                    >
                                        Reset
                                    </Button>
                                </span>
                                <span>
                                    Don&apos;t have an account?{" "}
                                    <Button
                                        variant={"link"}
                                        className="p-0 text-blue-500 dark:text-blue-500"
                                        onClick={() => setMode("register")}
                                    >
                                        Sign up
                                    </Button>
                                </span>
                            </>
                        )}
                        {mode === "reset" && (
                            <>
                                <span>
                                    Remember your password?{" "}
                                    <Button
                                        variant={"link"}
                                        className="p-0 text-blue-500 dark:text-blue-500"
                                        onClick={() => setMode("login")}
                                    >
                                        Login
                                    </Button>
                                </span>
                            </>
                        )}
                        {mode === "register" && (
                            <>
                                <span>
                                    Already have an account?{" "}
                                    <Button
                                        variant={"link"}
                                        className="p-0 text-blue-500 dark:text-blue-500"
                                        onClick={() => setMode("login")}
                                    >
                                        Login
                                    </Button>
                                </span>
                            </>
                        )}
                    </DrawerFooter>
                </DrawerContent >
            </Drawer >
        </>
    )
}