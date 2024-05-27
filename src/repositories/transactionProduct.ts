import { QueryResult } from "pg";
import db from "../configs/pg";
import { ItransactionProduct } from "../models/transactionProduct";


export const createOneTransactionProduct = (body: ItransactionProduct): Promise<QueryResult<ItransactionProduct>> => {
    const query = `insert into transaction_products ( sizes_id , products_id , transactions_id , promo_id , subtotal )
    values ($1,$2,$3,$4,$5)
    returning *`
    const { sizes_id , products_id , transactions_id , promo_id , subtotal } = body;
    const values = [ sizes_id , products_id , transactions_id , promo_id , subtotal ];
    return db.query(query, values);
}

export const updateOneTransactionProduct = (id: string, body:ItransactionProduct): Promise<QueryResult<ItransactionProduct>> => {
    let query = `update transaction_products set `;
    let values = [];
    const { sizes_id , products_id , promo_id , subtotal } = body;

    if (sizes_id > 0) {
        query += ` sizes_id = $${values.length + 1}, `;
        values.push(sizes_id);
    }

    if (products_id > 0) {
        query += ` products_id = $${values.length + 1}, `;
        values.push(products_id);
    }

    if (promo_id > 0) {
        query += ` promo_id = $${values.length + 1}, `;
        values.push(promo_id);
    }

    if (subtotal > 0) {
        query += ` subtotal = $${values.length + 1}, `;
        values.push(subtotal);
    }

    query = query.slice(0, -2);

    // Add WHERE clause to specify the user ID
    query += ` WHERE transactions_id = $${values.length + 1} returning * `;
    values.push(id);

    return db.query(query , values);
};

export const getAllTransactionProduct = (): Promise<QueryResult<ItransactionProduct>> => {
    const query = ` select * from transaction_products `;
    return db.query(query)
};