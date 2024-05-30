interface IpaginationMeta {
    totalData?: number;
    totalPage?: number;
    page: number;
    prevLink: string | null;
    nextLink: string | null;
}

export interface IbasicResponse {
    msg: string; 
    data?: any[];
    err?: string;
    meta?: IpaginationMeta;
}

export interface IauthResponse extends IbasicResponse {
    data?: { token: string }[];
}

