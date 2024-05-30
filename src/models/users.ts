import { IbasicResponse } from "./response";

export interface IusersParams {
  username: string;
}

export interface IusersQuery {
  page: string;
  limit: string;
  [key: string]: any;
}

export interface IuserBody {
  username: string;
  user_email: string;
  user_phone: string;
}

export interface IdataUser  extends IuserBody {
  id: number;
  created_at?: string;
  updated_at?: string | null;
}

export interface IuserRegisterBody extends IuserBody {
  user_pass: string;
}

export interface IuserLoginBody {
  user_email: string;
  user_pass: string;
}

export interface IuserResponse extends IbasicResponse {
  data?: IdataUser[];
}

export interface IauthResponse extends IbasicResponse {
  data?: { token: string }[];
}


