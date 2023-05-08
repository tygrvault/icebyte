import ProtectedPage from "@/components/auth/protected-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/context";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import pb from "@/lib/pocketbase";
import { toast } from "sonner";
import {
    Dialog,
    DialogHeader,
    DialogFooter,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { AlertTriangle, Lock, X } from "lucide-react";
import Head from "next/head";

export default function AccountPage() {
    const { user, resetPassword, changePassword, requestEmailChange, deleteAccount } = useAuth();

    const [name, setName] = useState<string>(user?.name ?? "");
    const [email, setEmail] = useState<string>(user?.email ?? "");
    const [emailPublic, setEmailPublic] = useState<boolean>(user?.emailVisibility ?? false);

    const [publicProfile, setPublicProfile] = useState<boolean>(user?.public ?? false);

    const [oldPassword, setOldPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const [open, setOpen] = useState(false);

    // const [resetAccEmail, setResetAccEmail] = useState<string>("");
    const [deleteAccEmail, setDeleteAccEmail] = useState<string>("");

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
            <Head>
                <title>Account | Icebyte</title>
                <meta name="robots" content="noindex" data-sj-noindex />
            </Head>
            <ProtectedPage>
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex flex-col max-w-[1400px] w-full items-start justify-start pt-4 px-6 pb-6 sm:px-8 sm:pb-8 md:px-12 md:pb-12 lg:px-16 lg:pb-16 gap-4">
                        <div className="flex-col items-center gap-0 pb-4">
                            <h1 className="text-4xl font-extrabold">
                                Account
                            </h1>
                            <p className="text-primary-500">
                                Manage your preferences, settings and everything in between.
                            </p>
                        </div>

                        <div className="flex flex-col justify-center w-full gap-8">
                            <div className="flex flex-col gap-4 p-4 rounded-md bg-primary-200 dark:bg-primary-700/50">
                                <div className="flex flex-col gap-0">
                                    <h2 className="text-xl font-semibold">
                                        Name
                                    </h2>
                                    <p className="text-primary-500">
                                        Your name is <b>not</b> public and is only used for billing, notifications, and emails.
                                    </p>
                                </div>
                                <Input placeholder={user?.name} value={name} onChange={(e) => setName(e.target.value)} />
                                <div className="flex flex-row items-center justify-between gap-8">
                                    <p className="text-primary-500">
                                        Your name <b>must</b> be between 2 and 24 characters long.
                                    </p>
                                    <Button size="sm" onClick={async () => {
                                        if (name === user?.name) return toast.error("No changes were made.", {
                                            description: "Please make some changes before saving."
                                        });

                                        if (name.length < 2 || name.length > 24) return toast.error("Invalid name.", {
                                            description: "Your name must be between 2 and 24 characters long."
                                        });

                                        const formData = new FormData();
                                        formData.append("name", name);
                                        handleSave(formData, "Your name has been updated.");
                                    }}>
                                        Save
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 p-4 rounded-md bg-primary-200 dark:bg-primary-700/50">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-col gap-0">
                                        <h2 className="text-xl font-semibold">
                                            Email
                                        </h2>
                                        <p className="text-primary-500">
                                            Your email is only used for authentication and to contact you.
                                        </p>
                                    </div>
                                </div>
                                <Input placeholder={user?.email} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center gap-2">
                                        <Checkbox checked={emailPublic} onClick={(e) => setEmailPublic(!emailPublic)} />
                                        <p>Make my email public.</p>
                                    </div>
                                    <Button size="sm" onClick={() => {
                                        if (email === user?.email && emailPublic === user?.emailVisibility) return toast.error("No changes were made.", {
                                            description: "Please make some changes before saving."
                                        });

                                        if (emailPublic !== user?.emailVisibility) {
                                            const formData = new FormData();
                                            formData.append("emailVisibility", emailPublic.toString());
                                            handleSave(formData, "Your email settings has been updated.");
                                        }

                                        if (email !== user?.email) {
                                            requestEmailChange(email);
                                        }
                                    }}>
                                        Save
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 rounded-md bg-primary-200 dark:bg-primary-700/50">
                                <div className="flex flex-col gap-4 px-4 pt-4">
                                    <div className="flex flex-col gap-0">
                                        <h2 className="text-xl font-semibold">
                                            Password
                                        </h2>
                                        <p className="text-primary-500">
                                            Please make sure your password is at least 8 characters long.
                                        </p>
                                    </div>
                                    <Input type="password" placeholder="Enter your old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                    <Input type="password" placeholder="Enter your new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Input type="password" placeholder="Confirm your new password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                                </div>
                                <hr className="w-full border-black/10 dark:border-white/10" />
                                <div className="flex flex-row items-center justify-between gap-4 px-4 pb-4 lg:justify-end">
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger>
                                            <Button variant="ghost" className="dark:text-primary-300 hover:bg-primary-300/50" size="sm">
                                                Forgot password?
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] p-0">
                                            <DialogHeader className="px-4 pt-4">
                                                <DialogTitle className="text-4xl font-extrabold text-center">
                                                    Reset password
                                                </DialogTitle>
                                                <DialogDescription className="m-0 text-center text">
                                                    Please enter your email address to reset your password.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col gap-4 px-4">
                                                <Input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <Button className="w-full text-md" onClick={() => {
                                                    resetPassword(email);
                                                }}>Send</Button>
                                            </div>
                                            <DialogFooter />
                                            <DialogClose className="absolute top-4 right-4 focus:outline-none disabled:pointer-events-none">
                                                <X className="w-4 h-4" />
                                                <span className="sr-only">Close</span>
                                            </DialogClose>
                                        </DialogContent>
                                    </Dialog>

                                    <Button size="sm" onClick={() => {
                                        if (oldPassword.length < 1) return toast.error("Invalid fields.", {
                                            description: "Make sure you specify your old password."
                                        });

                                        if (password.length < 8 || passwordConfirm.length < 8) return toast.error("Invalid length.", {
                                            description: "Make sure your new password is at least 8 characters long."
                                        })

                                        if (password !== passwordConfirm) return toast.error("Passwords do not match.", {
                                            description: "Please make sure your passwords match."
                                        });

                                        changePassword(oldPassword, password, passwordConfirm);
                                    }}>
                                        Save
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-row items-center w-full gap-4 pt-8">
                                {/* <hr className="w-full border border-black/10 dark:border-white/10" /> */}
                                <div className="flex flex-row items-center gap-3">
                                    <Lock />
                                    <h2 className="text-3xl font-bold">
                                        Privacy
                                    </h2>
                                </div>
                                <hr className="w-full border border-black/10 dark:border-white/10" />
                            </div>

                            <div className="flex flex-col gap-4 p-4 rounded-md bg-primary-200 dark:bg-primary-700/50">
                                <div className="flex flex-col gap-0">
                                    <h2 className="text-xl font-semibold">
                                        Public Profile
                                    </h2>
                                    <p className="text-primary-500">
                                        Control whether or not you want your profile to be public. Note: If you profile is <b>not</b> public, your comments will only be viewable by the author of the post.
                                    </p>
                                </div>
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <div className="flex flex-row items-center gap-2">
                                        <Checkbox checked={publicProfile} onClick={() => setPublicProfile(!publicProfile)} />
                                        <p>Make my profile public</p>
                                    </div>
                                    <Button size="sm" onClick={() => {
                                        if (publicProfile === user?.publicProfile) return toast.error("No changes were made.", {
                                            description: "Please make some changes before saving."
                                        });

                                        const formData = new FormData();
                                        formData.append("public", publicProfile.toString());
                                        handleSave(formData, "Your profile settings has been updated.");
                                    }}>
                                        Save
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-row items-center w-full gap-4 pt-8">
                                {/* <hr className="w-full border border-black/10 dark:border-white/10" /> */}
                                <div className="flex flex-row items-center gap-3">
                                    <AlertTriangle />
                                    <h2 className="text-3xl font-bold">
                                        Danger
                                    </h2>
                                </div>
                                <hr className="w-full border border-black/10 dark:border-white/10" />
                            </div>

                            {/* <div className="flex flex-col gap-4 p-4 rounded-md bg-primary-200 dark:bg-primary-700/50">
                                <div className="flex flex-col gap-0">
                                    <h2 className="text-xl font-semibold">
                                        Reset account
                                    </h2>
                                    <p className="text-primary-500">
                                        This deletes all comments, likes, adjusted account data like notification preferences, avatars and banners.
                                    </p>
                                </div>
                                <Input placeholder="Enter your email to confirm account wipe" value={resetAccEmail} onChange={(e) => setResetAccEmail(e.target.value)} />
                                <div className="flex flex-row justify-between">
                                    <p className="text-primary-500">This action is <b>irreversible</b>.</p>
                                    <Button disabled={resetAccEmail !== user?.email} size="sm" >
                                        Reset
                                    </Button>
                                </div>
                            </div> */}

                            <div className="flex flex-col gap-4 p-4 rounded-md bg-primary-200 dark:bg-primary-700/50">
                                <div className="flex flex-col gap-0">
                                    <h2 className="text-xl font-semibold">
                                        Delete account
                                    </h2>
                                    <p className="text-primary-500">
                                        This deletes <b>ALL</b> data regarding your account. Your username and email will be avalible to use to create another account.
                                    </p>
                                </div>
                                <Input placeholder="Enter your email to confirm deletion" value={deleteAccEmail} onChange={(e) => setDeleteAccEmail(e.target.value)} />
                                <div className="flex flex-row justify-between">
                                    <p className="text-primary-500">This action is <b>irreversible</b>.</p>
                                    <Button disabled={deleteAccEmail !== user?.email} onClick={async () => await deleteAccount()} size="sm">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedPage >
        </>
    )
}