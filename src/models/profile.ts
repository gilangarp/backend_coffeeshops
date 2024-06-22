export interface IprofileBody {
    users_id: number;
    avatar: string;
    first_name: string;
    last_name: string;
    user_address: string
}

export interface IdataProfile extends IprofileBody {
    id: number;
    created_at: string;
    updated_at?: string;
    error?: string;
}