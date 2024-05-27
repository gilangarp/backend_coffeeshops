import db from "../configs/pg"
import { IorderDetailsBody } from "../models/orderDetails";

export const getAllOrdersDetails = () => {
    const query = `select * from orderDetails`;
    return db.query(query);
}

export const createNewOrderDetails = (body: IorderDetailsBody) => {
    const query = `insert into orderdetails (order_id,product_id,promo_id)
    values ($1, $2, $3)
    returning *`
    const {order_id,product_id,promo_id} = body;
    const values = [order_id,product_id,promo_id];
    return db.query(query, values);
}

export const updateOneOrderDetails = (id: string, body: IorderDetailsBody) => {
    const query = `
        update orderdetails
        set order_id = $2,
            product_id = $3,
            promo_id = $4
        where id = $1
        returning *`;
    const { order_id, product_id, promo_id } = body;
    const values = [id, order_id, product_id, promo_id];
    return db.query(query, values);
}

export const deleteOneOrderDetail = (id: string) => {
    const query = `update orderdetails set is_deleted = true
    where id = $1
    returning *`
    const values = [id]
    return db.query(query, values)
};