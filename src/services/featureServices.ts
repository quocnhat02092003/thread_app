import API from "./refreshTokenService";


export const GetDataProfileUser = async (username: string) => {
  try {
    const response = await API.get(`api/feature/profile/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const GetAllPostsFromAllUsers = async (page : number) => {
  try {
    const response = await API.get(`api/feature/all-posts?_page=${page}&_limit=10`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const GetPostById = async (postId: string) => {
  try {
    const response = await API.get(`api/feature/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}