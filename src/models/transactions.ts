import { IbasicResponse } from "./response";

export interface ItransactionBody {
    users_id: number;
    subtotal: number;
    payments_id: number;
    delivery_id: number;
    status_id: number;
    grand_total: number
}

export interface IdataTransaction extends ItransactionBody {
    id: number;
    created_date: string,
    updated_at?: string
}

export interface ItransactionQuery {
    page: string;
    limit: string;
    [key: string]: any;
  }
  
export interface ItransactionResponse extends IbasicResponse {
    data?: IdataTransaction[];
}