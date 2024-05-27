/* export interface IusersBody{
    avatar_user: string,
    fullname_user: string,
    username:string,
    email_user: string,
    phone_user: string,
    address_user: string,
}

export interface Iusers extends IusersBody {
    id: number,
    created_at?: string,
    updated_at?: string
}

export interface IusersRegisterBody extends IusersBody{
    pass_user: string;
  }

export interface IusersLoginBody {
  username: string;
  pass_user: string;
}
 */

export interface IusersQuery{
  page: number;
  pageSize: number
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


