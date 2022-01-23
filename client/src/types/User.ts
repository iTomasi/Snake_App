export interface IUserEditable {
    profile_picture: {
        url: string;
        blob: Blob | null;
    }
}

export interface IUserEditAxios {
    profile_picture?: string;
}