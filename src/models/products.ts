export interface IproductBody {
    product_name: string ;
    product_price: number ;
    product_description: string ; 
    categories_id: number ;
    product_stock: string
}

export interface Idataproduct extends IproductBody {
    id: number,
    created_at: string,
    updated_at?: string

}

export interface IproductModel {
    id: number,
}

export interface IproductQuery{
    searchText: string ; 
    category: string;
    minimumPrice: number;
    maximumPrice: number;
    sort: string;
    promo?: boolean;
    limit:{
        page: number;
        pageSize: number
    }
}


    /* sort: {
        column: 'price_product' | 'name_product' | 'created_at' | '',
        type: "cheaped"|"priciest" | "a-z" | "z-a" | "latest" | "longest"| " "
    } */