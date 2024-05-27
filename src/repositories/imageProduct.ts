import { QueryResult } from "pg";
import db from "../configs/pg";
import { IdataImageProduct, IimageProductBody } from "../models/imageProduct";

export const createNewImageProduct = (body: IimageProductBody ): Promise<QueryResult<IdataImageProduct>> => {
    const query = `insert into image_product (img_product , product_id )
    values ($1 , $2 )
    returning img_product , product_id , created_at , updated_at`;
    const { img_product , product_id } = body;
    const values = [ img_product , product_id ];
    return db.query(query,values);
}

export const getAllImageProduct  = (): Promise<QueryResult<IdataImageProduct>> => {
    const query = ` select * from image_product`;
    return db.query(query)
};

export const updateOneImageProduct = (id:string , body: IimageProductBody): Promise<QueryResult<IdataImageProduct>> => {
    let query = ` update image_product set `;
    let values = [];

    const { img_product,product_id } = body;

    if (img_product?.length > 0) {
        query += `img_product = $${values.length + 1}, `;
        values.push(img_product);
    }
    if (product_id > 0) {
        query += `product_id = $${values.length + 1}, `;
        values.push(product_id);
    }

    // Remove the trailing comma and space from the query string
    query = query.slice(0, -2);

    // Add WHERE clause to specify the user ID
    query += ` WHERE id = $${values.length + 1} returning  img_product,product_id  `;
    values.push(id);

    return db.query(query, values);
}