import { QueryResult } from "pg";
import db from "../configs/pg";
import { Iorders, IordersBody, IordersQuery } from "../models/orders";

export const getAllOrders = (queryParams: IordersQuery): Promise<QueryResult<Iorders>> => {
    let query = `select * from orders`;
    let value = [];
    const {page,pageSize} = queryParams;
    if (page && pageSize) {
        query += ` LIMIT $${value?.length + 1} OFFSET $${value?.length + 2}`;
        value.push(pageSize);
        value.push(page);
    }
    console.log(value)
    return db.query(query ,value);
}

export const createOrder = (body: IordersBody): Promise<QueryResult<Iorders>> => {
    const query = `insert into orders (number_order,payment_order,shipping_order,status_order,total_order,user_id)
    values ($1,$2,$3,$4,$5,$6)
    returning *`;
    const {number_order,payment_order,shipping_order,status_order,total_order,user_id}= body;
    const values = [number_order,payment_order,shipping_order,status_order,total_order,user_id];
    return db.query(query , values);
}

export const updateOneOrders = (id: string ,body: IordersBody): Promise<QueryResult<Iorders>> => {
    const query = `
    update orders
        set number_order = $2,
        payment_order = $3,
        shipping_order =$4,
        status_order = $5,
        total_order = $6,
        user_id = $7
    where id = $1
    returning *`;
    const {number_order,payment_order,shipping_order,status_order,total_order,user_id}= body;
    const values = [id,number_order,payment_order,shipping_order,status_order,total_order,user_id];
    return db.query(query , values);
};

export const deleteOneOrder = (id: string): Promise<QueryResult<Iorders>> => {
    const query = `update products set is_deleted = true
    where id = $1
    returning * `
    const values = [id]
    return db.query(query, values)
};