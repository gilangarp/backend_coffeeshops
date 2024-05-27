import { QueryResult } from "pg";
import db from "../configs/pg";
import { IdataProfile, IprofileBody } from "../models/profile";

export const createOneProfile = (body: IprofileBody ): Promise<QueryResult<IdataProfile>> => {
    const query = `insert into profile (users_id , avatar , first_name , last_name , user_address )
    values ($1,$2,$3,$4,$5)
    returning users_id , avatar , first_name , last_name , user_address `;
    const { users_id , avatar , first_name , last_name , user_address } = body;
    const values = [ users_id , avatar , first_name , last_name , user_address ];
    return db.query(query,values);
}

export const getAllProfile = (): Promise<QueryResult<IdataProfile>> => {
    const query = `select * from profile`
    return db.query(query)
};

export const updateOneProfile = (id: string, body: IprofileBody): Promise<QueryResult<IdataProfile>> => {
    let query = `update profile set `;
    let values = [];
    const { avatar,first_name,last_name,user_address } = body;

    if (avatar?.length > 0) {
        query += ` avatar = $${values.length + 1}, `;
        values.push(avatar);
    }

    if (first_name?.length > 0) {
        query += ` first_name = $${values.length + 1}, `;
        values.push(first_name);
    }

    if (last_name?.length > 0) {
        query += ` last_name = $${values.length + 1}, `;
        values.push(last_name);
    }

    if (user_address?.length > 0) {
        query += ` user_address = $${values.length + 1}, `;
        values.push(user_address);
    }

    query = query.slice(0, -2);

    // Add WHERE clause to specify the user ID
    query += ` where users_id = $${values.length + 1} returning  * `;
    values.push(id);

    return db.query(query, values);
}