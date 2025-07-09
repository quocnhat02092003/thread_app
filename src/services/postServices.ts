import { PostData } from "../types/PostType";
import API from "./refreshTokenService";

export const uploadPost = async (data : PostData) => {
    try {
        const response = await API.post("/api/post/upload",data);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}