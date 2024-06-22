import { IbasicResponse } from "./response";

export interface IproductBody {
    product_name?: string;
    product_price?: number;
    product_description?: string;
    categories_id?: number;
    product_stock?: number
}

export interface Idataproduct extends IproductBody {
    id?: string;
    created_at?: string;
    updated_at?: string;
    uuid?: string;
    total_product?: string;
}

export interface IproductModel {
    id: string,
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

export interface IproductWithImageProductResponse extends IbasicResponse {
    data?: [ Idataproduct[] , Idataproduct[] ]
}
