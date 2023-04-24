"use client";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import LightLogo from "@/public/assets/logos/light.svg";
import DarkLogo from "@/public/assets/logos/dark.svg";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild className="block sm:hidden">
                    <Button variant="ghost" size="icon">
                        <Menu />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent position="right" size="content" className="">
                    <DrawerHeader>
                        <DrawerTitle className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-end gap-1">
                                <Link href="/" className="transition-all">
                                    <Image width={42} height={42} alt="Logo" src={DarkLogo} className="hidden p-0 dark:block" />
                                    <Image width={32} height={42} alt="Logo" src={LightLogo} className="block dark:hidden" />
                                </Link>
                            </div>
                            <DialogClose className="items-center text-primary-500">
                                <X className="w-6 h-6" />
                                <span className="sr-only">Close</span>
                            </DialogClose>
                        </DrawerTitle>
                        <DrawerDescription />
                    </DrawerHeader>
                    <DrawerFooter className="flex flex-col w-64 gap-4 pt-4">
                        <MobileLink href="/" onOpenChange={setOpen}>
                            <Button className="w-full text-black dark:text-white" theme="secondary">
                                Home
                            </Button>
                        </MobileLink>
                        <MobileLink href="/articles" onOpenChange={setOpen}>
                            <Button className="w-full text-black dark:text-white" theme="secondary">
                                Articles
                            </Button>
                        </MobileLink>
                        <MobileLink href="/team" onOpenChange={setOpen}>
                            <Button className="w-full text-black dark:text-white" theme="secondary">
                                Team
                            </Button>
                        </MobileLink>
                    </DrawerFooter >
                </DrawerContent >
            </Drawer >
        </>
    );
}

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
}

function MobileLink({
    href,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) {
    const router = useRouter()
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString())
                onOpenChange?.(false)
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </Link>
    )
}