export interface IRequestLogin {
    email: string;
    password: string;
}

export interface IResponseLogin {
    token: string;
}