interface AuthType {
    id: string;
    username: string;
    password: string;
    displayName: string;
    createdAt: Date;
    follower: number;
    avatarURL: string;
    introduction: string;
    anotherPath: string;
    verified: boolean;
}

export type {AuthType}