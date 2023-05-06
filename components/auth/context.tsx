"use client";

import ClientError from "@/types/ClientError";
import React, { useCallback, useEffect } from "react";
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

    resetPassword: (email: string) => void;
    changePassword: (oldPassword: string, newPassword: string, newPasswordConfirm: string) => void;
    requestEmailChange: (newEmail: string) => void;

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
        `${process.env.NEXT_PUBLIC_URL}/assets/auth/avatar.jpg`,

    banner: pb.authStore.model?.banner ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
        `${process.env.NEXT_PUBLIC_URL}/assets/auth/banner.jpg`,

    logIn: async () => { },
    logOut: () => { },
    register: async () => { },
    update: async () => { },

    resetPassword: () => { },
    changePassword: () => { },
    requestEmailChange: () => { },

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
        `${process.env.NEXT_PUBLIC_URL}/assets/auth/avatar.jpg`);

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
            if (!err.response.data) return toast.error("An unexpected error occured!", {
                description: "Check the console for more details."
            });
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
                if (err.response.data) {
                    let e = Object.values(err.response.data)[0];

                    toast.error("Something went wrong sending your request.", {
                        description: e.message
                    });
                }
            });
        }

        await createUser();
    }

    async function update() {
        await pb.collection("users").authRefresh().then((response) => {
            setUser(response.record);
            setAvatar(response.record?.avatar ?
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${response.record.id}/${response.record.avatar}` :
                `${process.env.NEXT_PUBLIC_URL}/assets/auth/avatar.jpg`);

            setBanner(response.record?.banner ?
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${response.record.id}/${response.record.banner}` :
                `${process.env.NEXT_PUBLIC_URL}/assets/auth/banner.jpg`);
        }).catch((err) => {
            console.error(err);
        })
    }

    function resetPassword(email: string) {
        toast.promise(pb.collection("users").requestPasswordReset(email), {
            loading: "Sending...",
            success: (data) => {
                return "If your email is registered, you should receive an email shortly.";
            },
            error: (err) => {
                return "An invalid email was provided. Please try again.";
            }
        });
    }

    function changePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string) {
        const formData = new FormData();
        formData.append("oldPassword", oldPassword);
        formData.append("password", newPassword);
        formData.append("passwordConfirm", newPasswordConfirm);

        pb.collection("users").update(user?.id as string, formData).then(() => {
            toast.success("Success!", {
                description: "Your password has been changed. Please log in again."
            });
            setUser(null);
            pb.authStore.clear();
        }).catch((err) => {
            console.error(err);
            toast.error("Something went wrong!", {
                description: "Check the console for more details."
            });
        });
    }

    function requestEmailChange(newEmail: string) {
        toast.promise(pb.collection("users").requestEmailChange(newEmail), {
            loading: "Sending...",
            success: (data) => {
                return "Check your new email for a verification link.";
            },
            error: (err) => {
                return "Failed to send email. Please try again.";
            }
        });
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
                    setAvatar(`${process.env.NEXT_PUBLIC_URL}/assets/auth/avatar.jpg`);
                    return "Successfully removed avatar.";
                },
                error: (err) => {
                    return "Failed to remove avatar. Please try again later."
                }
            });
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

    const deleteAccount = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        setMounted(true);

        if (pb.authStore.model && pb.authStore.isValid) {
            pb.collection("users").subscribe(pb.authStore.model.id, (res) => {
                // If email has changed, the cookie is invalidated and the user is logged out.
                if (res.record.email !== user?.email) {
                    setUser(null);
                    pb.authStore.clear();
                    toast.success("Success", {
                        description: "Your email has been changed. Please log in again.",
                        duration: 10000,
                    });
                }
                update();
            });
        }

        setLoggedIn(pb.authStore.isValid);
        setUser(pb.authStore.model);

        setAvatar(pb.authStore.model?.avatar ?
            `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
            `${process.env.NEXT_PUBLIC_URL}/assets/auth/avatar.jpg`);

        setBanner(pb.authStore.model?.banner ?
            `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
            `${process.env.NEXT_PUBLIC_URL}/assets/auth/banner.jpg`);

        return () => {
            pb.collection("users").unsubscribe();
            setMounted(false)
        }

        // Ignoring the line with reason: isValid is used to re-run the effect after every re-render of the component.
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        resetPassword,
        changePassword,
        requestEmailChange,

        uploadAvatar,
        removeAvatar,

        uploadBanner,
        removeBanner,
        deleteAccount
    }), [avatar, banner, deleteAccount, loggedIn, user]);

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