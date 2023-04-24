"use client";

import ClientError from "@/types/ClientError";
import React, { useEffect } from "react";
import pb from "@/lib/pocketbase";
import { toast } from "sonner";

export interface AuthSession {
    authStore: typeof pb.authStore;

    user: typeof pb.authStore.model;
    loggedIn: typeof pb.authStore.isValid;

    avatar: string;
    banner: string;

    logIn: (email: string, password: string) => Promise<void>;
    logOut: () => void;
    register: (
        name: string,
        username: string,
        email: string,
        password: string,
        passwordConfirm: string,
    ) => Promise<void>;
    update: () => Promise<void>;

    uploadAvatar: (file: File) => Promise<void>;
    removeAvatar: () => Promise<void>;

    uploadBanner: (file: File) => Promise<void>;
    removeBanner: () => Promise<void>;

    deleteAccount: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthSession>({
    authStore: pb.authStore,

    user: pb.authStore.model,
    loggedIn: pb.authStore.isValid,

    avatar: pb.authStore.model?.avatar ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
        `https://api.dicebear.com/6.x/identicon/svg?seed=${pb.authStore.model?.email}&scale=60&radius=50&backgroundColor=ffffff`,

    banner: pb.authStore.model?.banner ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
        `${process.env.NEXT_PUBLIC_URL}/assets/auth/banner.jpg`,

    logIn: async () => { },
    logOut: () => { },
    register: async () => { },
    update: async () => { },

    uploadAvatar: async () => { },
    removeAvatar: async () => { },

    uploadBanner: async () => { },
    removeBanner: async () => { },

    deleteAccount: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // Wait for the client to be mounted before rendering the children.
    const [mounted, setMounted] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(pb.authStore.isValid);
    const [user, setUser] = React.useState(pb.authStore.model);
    const [avatar, setAvatar] = React.useState(pb.authStore.model?.avatar ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
        `https://api.dicebear.com/6.x/identicon/svg?seed=${pb.authStore.model?.email}&scale=60&radius=50&backgroundColor=ffffff`);

    const [banner, setBanner] = React.useState(pb.authStore.model?.banner ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
        `${process.env.NEXT_PUBLIC_URL}/assets/auth/banner.jpg`);

    const logIn = async (email: string, password: string) => {
        await pb.collection("users").authWithPassword(email, password).then((record) => {
            setLoggedIn(true);
            setUser(pb.authStore.model);
            toast.success("Success!", {
                description: `Welcome back, ${record.record.username}!`
            });
        }).catch((err: ClientError) => {
            console.error(JSON.stringify(err, null, 2));
            let title = "Invalid ";
            if (err.response.message === "Failed to authenticate.") title += "credentials."
            if (err.response.data.identity && err.response.data.identity.code === "validation_required") title += "email"
            if (err.response.data.password && err.response.data.password.code === "validation_required") title.length <= 8 ? title += "password." : title += " and password."

            toast.error(title, {
                description: err.response.message
            });
        });
    }

    const logOut = () => {
        setUser(null);
        pb.authStore.clear();
        toast.success("Logged out. See you soon!")
    }

    const register = async (
        name: string,
        username: string,
        email: string,
        password: string,
        passwordConfirm: string,
    ) => {
        async function createUser() {
            if (!name || name.length < 2) return toast.error("Missing required field!", { description: "Please enter a valid name with at least 2 characters." });
            if (!username || username.length < 3) return toast.error("Missing required field!", { description: "Please enter a valid username with at least 3 characters." });
            if (!email || !email.includes("@")) return toast.error("Missing required field!", { description: "Please enter a valid email." });
            if (!password || password.length < 8 || password.length > 72) return toast.error("Missing required field!", { description: "Please enter a valid password between 3 and 72 characters long." });
            if (password !== passwordConfirm) return toast.error("Passwords mismatch!", { description: "The passwords do not match. Please try again." });

            await pb.collection("users").create({
                name,
                username,
                email,
                password,
                passwordConfirm
            }).then(async () => {
                await pb.collection("users").requestVerification(email);
                toast.success("Success!", {
                    description: "Please check your email for a verification link."
                });
            }).catch((err: ClientError) => {
                let e = Object.values(err.response.data)[0];
                toast.error("Something went wrong sending your request.", {
                    description: e.message
                });
            });
        }

        await createUser();
    }

    async function update() {
        await pb.collection("users").authRefresh().then((response) => {
            setUser(response.record);
            setAvatar(response.record?.avatar ?
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${response.record.id}/${response.record.avatar}` :
                `https://api.dicebear.com/6.x/identicon/svg?seed=${response.record?.email}&scale=60&radius=50&backgroundColor=ffffff`);

            setBanner(response.record?.banner ?
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${response.record.id}/${response.record.banner}` :
                `${process.env.NEXT_PUBLIC_URL}/assets/auth/banner.jpg`);
        }).catch((err) => {
            console.error(err);
        })
    }

    async function uploadAvatar(file: File) {
        const formData = new FormData();
        formData.append("avatar", file);

        toast.promise(pb.collection("users").update(pb.authStore.model?.id as string, formData),
            {
                loading: "Uploading...",
                success: (data) => {
                    setAvatar(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${data.id}/${data.avatar}`);
                    return "Successfully uploaded avatar.";
                },
                error: (err) => {
                    return "Failed to upload avatar. Please try again later."
                }
            })
    }

    async function removeAvatar() {
        toast.promise(pb.collection("users").update(pb.authStore.model?.id as string, { avatar: null }),
            {
                loading: "Removing...",
                success: (data) => {
                    setAvatar(`https://api.dicebear.com/6.x/identicon/svg?seed=${data.email}&scale=60&radius=50&backgroundColor=ffffff`);
                    return "Successfully removed avatar.";
                },
                error: (err) => {
                    return "Failed to remove avatar. Please try again later."
                }
            })
    }

    async function uploadBanner(file: File) {
        const formData = new FormData();
        formData.append("banner", file);

        toast.promise(pb.collection("users").update(pb.authStore.model?.id as string, formData),
            {
                loading: "Uploading...",
                success: (data) => {
                    setBanner(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${data.id}/${data.banner}`);
                    return "Successfully uploaded banner.";
                },
                error: (err) => {
                    return "Failed to upload banner. Please try again later."
                }
            })
    }

    async function removeBanner() {
        toast.promise(pb.collection("users").update(pb.authStore.model?.id as string, { banner: null }),
            {
                loading: "Removing...",
                success: (data) => {
                    setBanner(`${process.env.NEXT_PUBLIC_URL}/assets/auth/banner.jpg`);
                    return "Successfully removed banner.";
                },
                error: (err) => {
                    return "Failed to remove banner. Please try again later."
                }
            })
    }

    async function deleteAccount() {
        toast.promise(pb.collection("users").delete(pb.authStore.model?.id as string),
            {
                loading: "Deleting...",
                success: (data) => {
                    logOut();
                    return "Successfully deleted account. We'll miss you!";
                },
                error: (err) => {
                    return "Failed to delete account. Please try again later."
                }
            })
    }

    useEffect(() => {
        setMounted(true);

        if (pb.authStore.model) {
            pb.collection("users").subscribe(pb.authStore.model.id, () => {
                update();
            });
        }

        setLoggedIn(pb.authStore.isValid);
        setUser(pb.authStore.model);

        setAvatar(pb.authStore.model?.avatar ?
            `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
            `https://api.dicebear.com/6.x/identicon/svg?seed=${pb.authStore.model?.email}&scale=60&radius=50&backgroundColor=ffffff`);

        setBanner(pb.authStore.model?.banner ?
            `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
            `${process.env.NEXT_PUBLIC_URL}/assets/auth/banner.jpg`);

        return () => {
            pb.collection("users").unsubscribe("*");
            setMounted(false)
        }

    }, [pb.authStore.isValid]);

    const value = React.useMemo(() => ({
        authStore: pb.authStore,

        user,
        avatar,
        banner,
        loggedIn,

        logIn,
        logOut,
        register,
        update,

        uploadAvatar,
        removeAvatar,

        uploadBanner,
        removeBanner,

        deleteAccount
    }), [
        pb.authStore,

        user,
        avatar,
        banner,
        loggedIn,

        logIn,
        logOut,
        register,
        update,

        uploadAvatar,
        removeAvatar,

        uploadBanner,
        removeBanner,

        deleteAccount
    ]);

    return (
        <>
            <AuthContext.Provider value={value}>
                {mounted && children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}