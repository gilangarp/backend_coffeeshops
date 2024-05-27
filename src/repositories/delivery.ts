import { QueryResult } from "pg";
import db from "../configs/pg";
import { IdataDelivery, IdeliveryBody } from "../models/delivery";

export const createOneDelivery = (body: IdeliveryBody ): Promise<QueryResult<IdataDelivery>> => {
    const query = `insert into delivery ( delivery_method ,minimum_cost ,minimum_distance ,added_cost )
    values ( $1 , $2 , $3 , $4 )
    returning delivery_method ,minimum_cost ,minimum_distance ,added_cost`;
    const { delivery_method ,minimum_cost ,minimum_distance ,added_cost } = body;
    const values = [ delivery_method ,minimum_cost ,minimum_distance ,added_cost ];
    return db.query(query,values);
}

export const getAllDelivery  = (): Promise<QueryResult<IdataDelivery>> => {
    const query = ` select * from delivery`;
    return db.query(query)
};

export const updateOneDelivery = (id:string , body: IdeliveryBody): Promise<QueryResult<IdataDelivery>> => {
    let query = ` update delivery set `;
    let values = [];

    const { delivery_method ,minimum_cost ,minimum_distance ,added_cost } = body;

    if (delivery_method?.length > 0) {
        query += `delivery_method = $${values.length + 1}, `;
        values.push(delivery_method);
    }

    if (minimum_cost >= 0) {
        query += `minimum_cost = $${values.length + 1}, `;
        values.push(minimum_cost);
    }

    if (minimum_distance >= 0) {
        query += `minimum_distance = $${values.length + 1}, `;
        values.push(minimum_distance);
    }

    if (added_cost >= 0) {
        query += `added_cost = $${values.length + 1}, `;
        values.push(added_cost);
    }

    query = query.slice(0, -2);

    query += ` WHERE id = $${values.length + 1} returning  *  `;
    values.push(id);

    return db.query(query, values);
}