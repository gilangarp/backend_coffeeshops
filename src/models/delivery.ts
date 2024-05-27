export interface IdeliveryBody {
    delivery_method: string;
    minimum_cost: number;
    minimum_distance: number;
    added_cost: number
}

export interface IdataDelivery extends IdeliveryBody {
    id: number;
    created_at: string;
    updated_at?: string
}