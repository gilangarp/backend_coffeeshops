import { QueryResult } from "pg";
import db from "../configs/pg";
import { IdataImageProduct } from "../models/imageProduct";

export const createNewImageProduct = (id: string , imgUrl?: string ): Promise<QueryResult<IdataImageProduct>> => {
    const query = `
        INSERT INTO image_product (img_product, product_id)
        VALUES ($1, $2)
        RETURNING * `;
    const values: (string | null)[] = [];
    if (imgUrl) values.push(`/imgs/${imgUrl}`);
    if (!imgUrl) values.push(null);
    values.push(id);
    return db.query(query, values);
}

export const getAllImageProduct  = (): Promise<QueryResult<IdataImageProduct>> => {
    const query = ` select * from image_product`;
    return db.query(query)
};

export const updateOneImageProduct = (id: string, imgUrl?: string): Promise<QueryResult<IdataImageProduct>> => {
    const query = `update image_product set img_product =$1 where id =$2 returning img_product `;
    const values: (string | null)[] = [];
    if (imgUrl) values.push(`/imgs/${imgUrl}`);
    if (!imgUrl) values.push(null);
    values.push(id);
    return db.query(query, values);
  }

