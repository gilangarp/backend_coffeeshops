export interface IpromoBody {
    discount_price: number,
    product_id:number,
}

export interface IdataPromo extends IpromoBody {
    id: number,
    created_at: string,
    updated_at?: string
}