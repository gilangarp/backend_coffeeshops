import { QueryResult } from "pg";
import db from "../configs/pg";
import { IdataTransaction, ItransactionBody, ItransactionProduct, ItransactionQuery } from '../models/transactions';

//Create Transaction 
export const createOneTransaction = (body: ItransactionBody): Promise<QueryResult<IdataTransaction>> => {
    const query = `insert into transactions ( users_id , subtotal , payments_id , delivery_id , status_id , grand_total )
    values ($1,$2,$3,$4,$5,$6)
    returning *`
    const { users_id , subtotal , payments_id , delivery_id , status_id , grand_total } = body;
    const values = [ users_id , subtotal , payments_id , delivery_id , status_id , grand_total ];
    return db.query(query, values);
};

//Create Transaction product
export const createOneTransactionProduct = ( id:string ,body: ItransactionProduct ): Promise<QueryResult<ItransactionProduct>> => {

    const query = `insert into transaction_products (  transactions_id,sizes_id,products_id,promo_id,subtotal )
    values ($1,$2,$3,$4,$5)
    returning *`

    const { sizes_id , products_id , promo_id , subtotal } = body;

    const values = [id, sizes_id , products_id , promo_id , subtotal];
    console.log(query,values)

    return db.query(query, values);

};

//get all Transaction 
export const getAllTransaction = (queryParams: ItransactionQuery): Promise<QueryResult<IdataTransaction>> => {
    let query = ` 
    select 
	    u.username,t.subtotal,p.payment_method,d.delivery_method,
	    s.status_mode,t.grand_total,t.created_at,t.updated_at
    from transactions t
    inner join users u on t.id = u.id inner join payments p on t.id = p.id 
    inner join delivery d  on t.id = d.id inner join status s on t.id = s.id 
    order by t.id asc `
    let value = [];
    const {page,limit} = queryParams;

    if (page && limit) { 
        const pageLimit = parseInt(limit);
        const offset = (parseInt(page) - 1) * pageLimit;
        query += ` limit $${value.length + 1} offset $${value.length + 2}`
        value.push(pageLimit , offset);
    }
    
    return db.query(query ,value);
};

//get all Transaction Product
export const getAllTransactionProduct = (): Promise<QueryResult<ItransactionProduct>> => {
    const query = ` 
                SELECT s.added_cost, 
                    p.product_price, 
                    t.delivery_id , 
                    tp.promo_id , 
                    tp.subtotal
                FROM transaction_products tp
                INNER JOIN sizes s ON tp.sizes_id = s.id
                INNER JOIN products p ON tp.products_id = p.id
                INNER JOIN transactions t ON tp.transactions_id = t.id `;
    return db.query(query)
};

//get total Transaction
export const getTotalTransaction = (): Promise<QueryResult<{ total_transaction: string }>> => {
    let query = 'select count(*) as "total_transaction" from transactions';
    return db.query(query);
};

//update Transaction
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

    query += ` WHERE id = $${values.length + 1} returning  users_id , subtotal , payments_id , delivery_id , status_id , grand_total  `;
    values.push(id);

    return db.query(query , values);
};

//update Transaction Product
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