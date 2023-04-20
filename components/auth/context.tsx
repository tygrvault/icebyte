import pb from "@/lib/pocketbase";
import { RecordAuthResponse, Record } from "pocketbase";
import React, { useEffect } from "react";
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
        toast.promise(pb.collection("users").authWithPassword(email, password), {
            loading: "Logging in...",
            success: (data: RecordAuthResponse<Record>) => {
                setLoggedIn(true);
                setUser(pb.authStore.model);
                return (`Welcome back, ${data.record.username}!`);
            },
            error: (err) => {
                return "Failed to authenticate. Please check your credentials."
            }
        });
    }

    const logOut = () => {
        setUser(null);
        pb.authStore.clear();
        toast.success("Logged out. See you soon!")
    }

    const register = async (
        username: string,
        email: string,
        password: string,
        passwordConfirm: string,
    ) => {
        const tag = (Math.floor(Math.random() * 9999) + 1).toString().padStart(4, "0");

        toast.promise(pb.collection("users").create({
            username,
            email,
            tag,
            password,
            passwordConfirm
        }), {
            loading: "Creating your account...",
            success: (data) => {
                console.log(data);
                return (`Success. Check your email for a confirmation link.`);
            },
            error: (err) => {
                if (err.response.data) {
                    if (err.response.data.email) {
                        return err.response.data.email.message === "Cannot be blank." ? "Email cannot be blank" : err.response.data.email.message;
                    }

                    if (err.response.data.password) {
                        return "Password " + err.response.data.password.message.toLowerCase();
                    }
                } else {
                    return "Failed to create your account. Please try again later."
                }
            }
        });
    }

    async function update() {
        toast.promise(pb.collection("users").authRefresh(),
            {
                loading: "Syncing...",
                success: (data) => {
                    setUser(data.record);
                    return "Successfully synced with database.";
                },
                error: (err) => {
                    return "Failed to update. Please try again later."
                }
            }
        )
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

        setLoggedIn(pb.authStore.isValid);
        setUser(pb.authStore.model);

        setAvatar(pb.authStore.model?.avatar ?
            `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
            `https://api.dicebear.com/6.x/identicon/svg?seed=${pb.authStore.model?.email}&scale=60&radius=50&backgroundColor=ffffff`);

        setBanner(pb.authStore.model?.banner ?
            `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
            `${process.env.NEXT_PUBLIC_URL}/assets/auth/banner.jpg`);

        return () => setMounted(false);
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