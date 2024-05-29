export interface IbasicResponse {
    msg: string; 
    data?: any[];
    err?: string;
}

export interface IauthResponse extends IbasicResponse {
    data?: { token: string }[];
}