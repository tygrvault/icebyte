import { Record } from "pocketbase";

export default interface User extends Record {
    avatar: string;
    banner: string;
    created: string;
    email?: string
    emailVisibility: boolean;
    id: string;
    name: string;
    public: boolean;
    updated: string;
    username: string;
    verified: boolean;
}