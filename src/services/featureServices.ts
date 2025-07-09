import API from "./refreshTokenService";


export const GetDataProfileUser = async (username: string) => {
  try {
    const response = await API.get(`api/feature/profile/${username}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
