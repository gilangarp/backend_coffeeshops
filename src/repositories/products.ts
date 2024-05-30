import { QueryResult } from "pg"
import db from "../configs/pg"
import { Idataproduct, IproductBody, IproductQuery } from "../models/products";


export const createProduct = (body: IproductBody): Promise<QueryResult<Idataproduct>> => {
    const query = `insert into products (product_name , product_price , product_description , categories_id , product_stock)
    values ($1, $2, $3, $4, $5)
    returning *`;
    const { product_name,product_price,product_description,categories_id,product_stock } = body;
    const values = [ product_name,product_price,product_description,categories_id,product_stock ];
    return db.query(query, values);
}

export const updateOneProduct = (id: string, body: IproductBody): Promise<QueryResult<Idataproduct>> => {
    let query = `UPDATE products SET `;
    let values = [];

    const {  product_name , product_price , product_description , categories_id , product_stock } = body;
   
    if (product_name?.length > 0) {
        query += `product_name = $${values.length + 1}, `;
        values.push(product_name);
    }

    if (product_price > 0) {
        query += `product_price = $${values.length + 1}, `;
        values.push(product_price);
    }

    if (product_description?.length > 0) {
        query += `product_description = $${values.length + 1}, `;
        values.push(product_description);
    }

    if (categories_id > 0) {
        query += `categories_id = $${values.length + 1}, `;
        values.push(categories_id);
    }

    if (product_stock?.length > 0) {
        query += `product_stock = $${values.length + 1}, `;
        values.push(product_stock);
    }

    // Remove the trailing comma and space from the query string
    query = query.slice(0, -2);

    // Add WHERE clause to specify the user ID
    query += ` WHERE id = $${values.length + 1} returning  product_name , product_price , product_description , categories_id , product_stock `;
    values.push(id);

    return db.query(query,values);
};

export const getAllProduct = async (queryParams:IproductQuery ): Promise<QueryResult<Idataproduct>> => {
    let query = ` select * from products  `;
    let value = [];
    let whereAdd = false;

    const {category, maximumPrice, minimumPrice, searchText, promo, sort ,page , limit} = queryParams;
    
    if (promo) {
        query += ` inner join promo on products.id = promo.product_id `;
    }

    if (searchText?.length > 0) {
        query += whereAdd ? ` and ` : ` where `;
        query += ` product_name ILIKE $${value?.length + 1} `
        value.push(`%${searchText}%`);
        whereAdd = true;
    }

    if (category) {
        query += whereAdd ? ` and ` : ` where `;
        query += ` category_product = $${value?.length + 1} `
        value.push(category);
        whereAdd = true;
    }

    if (minimumPrice > 0 && maximumPrice > 0) {
        if (maximumPrice > minimumPrice) {
            query += whereAdd ? ` and ` : ` where `;
            query += ` product_price between $${value?.length + 1} and $${value?.length + 2}`
            value.push(minimumPrice);
            value.push(maximumPrice);
            whereAdd = true;
        }
    }

    if (sort) {
        let orderByClause = ''; 
        if (sort === 'cheaped') {
            orderByClause = ` ORDER BY product_price ASC`;
        }else if (sort === 'priciest') {
            orderByClause = ` ORDER BY product_price DESC`; 
        }else if (sort === 'a-z') {
            orderByClause = ` ORDER BY product_name ASC`;
        }else if (sort === 'z-a') {
            orderByClause = ` ORDER BY product_name DESC`; 
        }else if (sort === 'latest') {
            orderByClause = ` ORDER BY created_at ASC`;
        }else if (sort === 'longest') {
            orderByClause = ` ORDER BY created_at DESC`; 
        }
    
        query += orderByClause;
    }
    
    if (limit) {
        query += " limit $" + (value.length + 1);
        value.push(limit);
    }

    if (page && limit) { 
        query += " offset $" + (value.length + 1);
        value.push((parseInt(page) - 1) * parseInt(limit));
    }

    console.log(page && limit)

    return db.query(query, value)
};

export const deleteOneProduct = (id: string): Promise<QueryResult<Idataproduct>> => {
    const query = `update products set is_deleted = true
    where id = $1
    returning *`
    const values = [id]
    return db.query(query, values)
};