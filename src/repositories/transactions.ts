import { QueryResult } from "pg";
import db from "../configs/pg";
import { IdataTransaction, ItransactionBody } from "../models/transactions";


export const createOneTransaction = (body: ItransactionBody): Promise<QueryResult<IdataTransaction>> => {
    const query = `insert into transactions ( users_id , subtotal , payments_id , delivery_id , status_id , grand_total )
    values ($1,$2,$3,$4,$5,$6)
    returning users_id , subtotal , payments_id , delivery_id , status_id , created_at , updated_at`
    const { users_id , subtotal , payments_id , delivery_id , status_id , grand_total } = body;
    const values = [ users_id , subtotal , payments_id , delivery_id , status_id , grand_total ];
    return db.query(query, values);
}

export const getAllTransaction = (): Promise<QueryResult<IdataTransaction>> => {
    const query = ` select * from transactions`;
    return db.query(query)
};

export const updateOneTransaction = (id: string, body:ItransactionBody): Promise<QueryResult<IdataTransaction>> => {
    let query = `update transactions set `;
    let values = [];
    const { users_id , subtotal , payments_id , delivery_id , status_id , grand_total } = body;

    if (users_id > 0) {
        query += ` users_id = $${values.length + 1}, `;
        values.push(users_id);
    }

    if (subtotal > 0) {
        query += ` subtotal = $${values.length + 1}, `;
        values.push(subtotal);
    }

    if (payments_id > 0) {
        query += ` payments_id = $${values.length + 1}, `;
        values.push(payments_id);
    }

    if (delivery_id > 0) {
        query += ` delivery_id = $${values.length + 1}, `;
        values.push(delivery_id);
    }

    if (status_id > 0) {
        query += ` status_id = $${values.length + 1}, `;
        values.push(status_id);
    }

    if (grand_total > 0) {
        query += ` grand_total = $${values.length + 1}, `;
        values.push(grand_total);
    }

    query = query.slice(0, -2);

    query += ` WHERE id = $${values.length + 1} returning  discount_price ,product_id `;
    values.push(id);

    return db.query(query , values);
};