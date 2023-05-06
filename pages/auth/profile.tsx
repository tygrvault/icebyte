import ProtectedPage from "@/components/auth/protected-page";
import { useAuth } from "@/components/auth/context";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import pb from "@/lib/pocketbase";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

export default function ProfilePage() {
    const { user, avatar, banner, uploadAvatar, uploadBanner, removeAvatar, removeBanner } = useAuth();

    const bannerInputRef = React.useRef<HTMLInputElement>(null);
    const avatarInputRef = React.useRef<HTMLInputElement>(null);

    const [username, setUsername] = useState(user?.username);

    const handleSave = (formData: FormData, message?: string) => {
        pb.collection("users").update(user?.id as string, formData).then(async (res) => {
            toast.success("Success", {
                description: message ?? "Your changes have been saved."
            });
        }).catch((err) => {
            console.error(err.response);
            return toast.error("Failed to save changes.", {
                description: JSON.stringify(err.response)
            });
        });
    }

    return (
        <>
            <ProtectedPage>
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex flex-col max-w-[1400px] w-full items-start justify-start pt-4 px-6 pb-6 sm:px-8 sm:pb-8 md:px-12 md:pb-12 lg:px-16 lg:pb-16 gap-4">
                        <div className="flex-col items-center gap-0 pb-4">
                            <h1 className="text-4xl font-extrabold">
                                Profile
                            </h1>
                            <p className="text-primary-500">
                                Manage your style and how you look to others on Icebyte!
                            </p>
                        </div>

                        <div className="flex flex-col justify-start w-full gap-8">
                            <div className="flex flex-col gap-4 p-4 rounded-md bg-primary-200 dark:bg-primary-700/50">
                                <div className="flex flex-col gap-0">
                                    <h2 className="text-xl font-semibold">
                                        Username
                                    </h2>
                                    <p className="text-primary-500">
                                        If your profile is public, your username is publicly visible in comments and likes.
                                    </p>
                                </div>
                                <Input placeholder={user?.username} value={username} onChange={(e) => setUsername(e.target.value)} />
                                <div className="flex flex-row items-center justify-between gap-8">
                                    <p className="text-primary-500">
                                        Your username <b>must</b> be between 2 and 12 characters long.
                                    </p>
                                    <Button size="sm" onClick={async () => {
                                        if (username === user?.username) return toast.error("No changes were made.", {
                                            description: "Please make some changes before saving."
                                        });

                                        if (username.length < 2 || username.length > 12) return toast.error("Invalid username.", {
                                            description: "Your username must be between 2 and 12 characters long."
                                        });

                                        const formData = new FormData();
                                        formData.append("username", username);
                                        handleSave(formData, "Your username has been updated.");
                                    }}>
                                        Save
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 p-4 rounded-md bg-primary-200 dark:bg-primary-700/50">
                                <div className="flex flex-col gap-0">
                                    <h2 className="text-xl font-semibold">
                                        Avatar
                                    </h2>
                                    <p className="text-primary-500">
                                        Your avatar will be publicly visible in comments and likes but not referenced to your user.
                                    </p>
                                </div>
                                <div className="flex flex-row items-center gap-4">
                                    <Avatar className="w-24 h-24">
                                        <AvatarImage src={avatar} />
                                        <AvatarFallback>{user?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <input type="file" ref={avatarInputRef} className="hidden" onChange={async (e) => {
                                        if (!e.target.files) return;
                                        await uploadAvatar(e.target.files[0]);
                                    }} />
                                    <div className="flex flex-col items-center gap-4">
                                        <Button size="sm" onClick={() => avatarInputRef.current?.click()}>
                                            Upload
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button size="sm" theme="secondary">
                                                    Remove
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your
                                                        avatar from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => removeAvatar()}>
                                                        Confirm
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-between gap-8">
                                    <p className="text-primary-500">
                                        Support file types include: <b>png, jpg, jpeg, gif, webp</b> <br />
                                        Max file size: <b>12MB</b>
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 p-4 rounded-md bg-primary-200 dark:bg-primary-700/50">
                                <div className="flex flex-col gap-0">
                                    <h2 className="text-xl font-semibold">
                                        Banner
                                    </h2>
                                    <p className="text-primary-500">
                                        Your banner will be publicly visible in comments and likes but not referenced to your user.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center max-w-lg gap-4 sm:flex-row">
                                    <AspectRatio ratio={2 / 1}>
                                        <img src={banner} alt="banner" className="object-cover w-full h-full rounded-md" />
                                    </AspectRatio>
                                    <input type="file" ref={bannerInputRef} className="hidden" onChange={async (e) => {
                                        if (!e.target.files) return;
                                        await uploadBanner(e.target.files[0]);
                                    }} />
                                    <div className="flex flex-row items-center gap-4 sm:flex-col">
                                        <Button size="sm" onClick={() => bannerInputRef.current?.click()}>
                                            Upload
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button size="sm" theme="secondary">
                                                    Remove
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your
                                                        banner from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => removeBanner()}>
                                                        Confirm
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-between gap-8">
                                    <p className="text-primary-500">
                                        Support file types include: <b>png, jpg, jpeg, gif, webp</b> <br />
                                        Max file size: <b>12MB</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedPage>
        </>
    )
}