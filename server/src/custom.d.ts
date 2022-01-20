declare namespace Express {
    export interface Request {
        user: any;
        user_access_token: string;
    }
}