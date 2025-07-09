import { createSlice } from "@reduxjs/toolkit";
import { InfoUser } from "../../types/AuthType";

const initialState : InfoUser = {
        id: 0,
        username: "",
        displayName: "",
        follower: 0,
        avatarURL: "",
        introduction: "",
        anotherPath: "",
        verified: false,
        createdAt: new Date(),
        needMoreInfoUser: true
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers:{
        login: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.displayName = action.payload.displayName;
            state.follower = action.payload.follower;
            state.avatarURL = action.payload.avatarURL;
            state.introduction = action.payload.introduction;
            state.anotherPath = action.payload.anotherPath;
            state.verified = action.payload.verified;
            state.createdAt = action.payload.createdAt;
        },
        logout: (state) => {
            state = {
                id: 0,
                username: "",
                displayName: "",
                follower: 0,
                avatarURL: "",
                introduction: "",
                anotherPath: "",
                verified: false,
                createdAt: new Date(),
                needMoreInfoUser : true
            };
        },
        updateUser: (state, action) => {
            state = { ...state, ...action.payload };
        }
    }
})

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;