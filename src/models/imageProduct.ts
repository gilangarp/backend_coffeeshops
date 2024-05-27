export interface IimageProductBody {
    img_product: string;
    product_id: number;
}

export interface IdataImageProduct extends IimageProductBody {
    id: number,
    created_at: string,
    updated_at?: string
}