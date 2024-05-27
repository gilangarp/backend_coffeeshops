export interface IordersBody {
    number_order: string,
    payment_order: string,
    shipping_order: string,
    status_order: string,
    total_order: number,
    user_id: number,
}

export interface Iorders extends IordersBody  {
    id: number,
    created_date: string,
    updated_at?: string
}

export interface IordersQuery {
    page: number;
    pageSize: number
}