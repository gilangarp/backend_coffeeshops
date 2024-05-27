import { QueryResult } from "pg";
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

export const getAllPromo = (): Promise<QueryResult<IdataPromo>> => {
    const query = ` select * from promo`;
    return db.query(query)
};

export const updateOnePromo = (id: string, body:IpromoBody): Promise<QueryResult<IdataPromo>> => {
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
};

/* 


export const deleteOnePromo = (id: string): Promise<QueryResult<IpromoBody>> => {
    const query = `update promo set is_deleted = true
    where id = $1
    returning *`
    const values = [id]
    return db.query(query, values)
};

 */