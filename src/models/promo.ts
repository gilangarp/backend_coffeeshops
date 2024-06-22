export interface IpromoBody {
    discount_price: number,
    product_id:number,
}

export interface IdataPromo extends IpromoBody {
    id: string,
    created_at: string,
    updated_at?: string
}