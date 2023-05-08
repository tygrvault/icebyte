import { BaseModel } from "pocketbase";
import User from "./User";

interface Comment extends BaseModel {
    article_id: string;
    author: string;
    body: string;
    expand: {
        author: User;
        [key: string]: any;
    }
}

export default Comment;