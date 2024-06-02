import { Pool, PoolClient, QueryResult } from "pg";
import db from "../configs/pg";
import { IdataImageProduct } from "../models/imageProduct";

export const createNewImageProduct = ( dbPool: Pool | PoolClient ,productIds: string , imgUrl?: string ): Promise<QueryResult<IdataImageProduct>> => {
    let query = `insert into image_product (img_product, product_id)
    values `;
    const values: (string | null)[] = [];
    const imgUrlValue = imgUrl ? `/imgs/${imgUrl}` : null ;

    query += ` ($${values.length + 1}, $${values.length + 2})`;
    values.push(imgUrlValue, productIds);
    query += ` returning *`;

    return dbPool.query(query, values);
};


export const getAllImageProduct  = (): Promise<QueryResult<IdataImageProduct>> => {
    const query = ` SELECT * FROM products INNER JOIN image_product ON products.id = image_product.product_id`;
    return db.query(query)
};

export const updateOneImageProduct = (dbPool: Pool | PoolClient ,productName: string , imgUrl?: string): Promise<QueryResult<IdataImageProduct>> => {
    
    let query = `update image_product set img_product = $1 where id = $2`;
    const values: (string | null)[] = [];
    const imgUrlValue = imgUrl ? `/imgs/${imgUrl}` : null ;
    if(values.length > 0){
        query += ` ($${values.length + 1}, $${values.length + 2})`;
        values.push(imgUrlValue, productName);
    }
    query += ` returning *`;

    return dbPool.query(query, values);
  };