import { Pool, PoolClient, QueryResult } from "pg";
import db from "../configs/pg";
import { IdataPromo, IpromoBody } from "../models/promo";


export const createOnePromo = (body: IpromoBody): Promise<QueryResult<IdataPromo>> => {
    const query = `insert into promo (discount_price,product_id)
    values ($1, $2)
    returning *`
    const { discount_price ,product_id } = body;
    const values = [ discount_price , product_id ];
    return db.query(query, values);
}

export const createNewImagePromo = ( dbPool: Pool | PoolClient ,productIds: string , imgUrl?: string ): Promise<QueryResult<IdataPromo>> => {
    let query = `insert into image_promo (img_promo, promo_id)
    values `;
    const values: (string | null)[] = [];
    const imgUrlValue = imgUrl ? `/imgs/${imgUrl}` : null ;
    query += ` ($${values.length + 1}, $${values.length + 2})`;
    values.push(imgUrlValue, productIds);
    query += ` returning img_product ,created_at , updated_at`;
    console.log(query,values)

    return dbPool.query(query, values);
};

export const getAllPromo = (): Promise<QueryResult<IdataPromo>> => {
    const query = ` select * from promo`;
    return db.query(query)
};

/* export const  = (id: string, body:IpromoBody): Promise<QueryResult<IdataPromo>> => {
    let query = `UPDATE promo SET `;
    let values = [];
    const { discount_price ,product_id } = body;

    if (discount_price > 0) {
        query += ` discount_price = $${values.length + 1}, `;
        values.push(discount_price);
    }
    if (product_id > 0) {
        query += ` product_id = $${values.length + 1}, `;
        values.push(product_id);
    }

    query = query.slice(0, -2);

    // Add WHERE clause to specify the user ID
    query += ` WHERE id = $${values.length + 1} returning  discount_price ,product_id `;
    values.push(id);

    return db.query(query , values);
}; */

export const checkIfPromoExists = async (id:string) => {
    const query = `SELECT COUNT(*) AS count FROM promo WHERE id = $1`;
    const Ischeck = await db.query(query, [id]);
    return Ischeck.rows[0].count > 0;
};

export const updateOnePromo = (id: string, body: IpromoBody,imgUrl?: string): Promise<QueryResult<IdataPromo>> => {
    let query = ` `;
    let values = [];
    let hasUpdates = false;

    const { discount_price  } = body;

    if (discount_price && discount_price > 0) {
        query += `discount_price = $${values.length + 1}, `;
        values.push(discount_price);
        hasUpdates = true;
    }

    if (hasUpdates) {
        query = `UPDATE promo SET ${query.slice(0, -2)} WHERE id = $${values.length + 1} RETURNING * ;`;
        values.push(id);
    } else {
        query = '';
    }

    if (imgUrl) {
        query += ` UPDATE image_promo SET img_promo = $${values.length + 1} WHERE promo_id = $${values.length + 2} RETURNING * `;
        values.push(imgUrl ? `/imgs/${imgUrl}` : null, id);
    }

    console.log(query,values)

    return db.query(query, values);
};
