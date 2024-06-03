import { IimageProductBody, IdataImageProduct } from './imageProduct';
import { IbasicResponse } from "./response";

export interface IproductBody {
    product_name: string ;
    product_price: number ;
    product_description: string ; 
    categories_id: number ;
    product_stock: string
}

export interface Idataproduct extends IproductBody {
    id?: string,
    created_at?: string,
    updated_at?: string
    total_product?: string;
}

export interface IproductModel {
    id: number,
}

export interface IproductQuery extends IproductTotalQuery{
    searchText: string ; 
    category: string;
    minimumPrice: number;
    maximumPrice: number;
    sort?: string;
    promo?: boolean;
}

export interface IproductTotalQuery{
    page?: string;
    limit?: string
    [key: string]: any;
}

export interface IproductResponse extends IbasicResponse {
    data?: Idataproduct[];
}

export interface IproductWithImageProduct extends IimageProductBody , IproductBody {}

export interface IproductWithImageProductResponse extends IbasicResponse {
    data?: [ Idataproduct[], IdataImageProduct[]?];
}

    /* sort: {
        column: 'price_product' | 'name_product' | 'created_at' | '',
        type: "cheaped"|"priciest" | "a-z" | "z-a" | "latest" | "longest"| " "
    } */