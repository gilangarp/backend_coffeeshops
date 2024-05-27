import { QueryResult } from "pg";
import db from "../configs/pg";
import { IdataSizeProduct, IsizeProductBody } from "../models/sizeProduct";


export const createOneSizeProduct = (body: IsizeProductBody): Promise<QueryResult<IdataSizeProduct>> => {
    const query = `insert into sizes ( size , added_cost)
    values ($1, $2)
    returning size , added_cost `
    const { size , added_cost } = body;
    const values = [size , added_cost ];
    return db.query(query, values);
}

export const getAllSizeProduct = (): Promise<QueryResult<IdataSizeProduct>> => {
    const query = ` select * from sizes`;
    return db.query(query)
};


export const updateOneSizeProduct = (id: string, body:IsizeProductBody): Promise<QueryResult<IdataSizeProduct>> => {
    let query = `UPDATE sizes SET `;
    let values = [];
    const { size , added_cost } = body;

    if (size?.length > 0) {
        query += ` size = $${values.length + 1}, `;
        values.push(size);
    }
    if (added_cost > 0) {
        query += ` added_cost = $${values.length + 1}, `;
        values.push(added_cost);
    }

    query = query.slice(0, -2);

    query += ` WHERE id = $${values.length + 1} returning size , added_cost `;
    values.push(id);

    return db.query(query , values);
};