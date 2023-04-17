import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_AUTH_URL);

export default pb;