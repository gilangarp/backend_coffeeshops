export interface IsizeProductBody {
    size: string;
    added_cost: number
}

export interface IdataSizeProduct extends IsizeProductBody {
    id: number,
    created_at: string,
    updated_at?: string
}