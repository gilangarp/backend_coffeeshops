
import { QueryResult } from "pg";
import db from "../configs/pg";
import { IdataUser, IuserBody, IusersQuery } from "../models/users";

export const registerUser = (body: IuserBody,hashedPassword: string): Promise<QueryResult<IdataUser>> => {
    const query = `insert into users ( username , user_email , user_phone , user_pass )
    values( $1 , $2 , $3 , $4 )
    returning username ,user_email ,user_phone`;
    const { username , user_email , user_phone } = body;
    const values = [ username , user_email , user_phone , hashedPassword ];
    return db.query(query, values);
  };

export const getAllUsers = (queryParams:IusersQuery): Promise<QueryResult<IdataUser>> => {
    let query = ` select username , user_email , user_phone from users order by username asc`
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

export const getOneUSer = (username: string): Promise<QueryResult<IdataUser>> => {
    const query = ` select username ,user_email ,user_phone from users where username = $1`
    const values = [username];
    return db.query(query,values);
}

export const getTotalUser = (): Promise<QueryResult<{ total_user: string }>> => {
    let query = 'select count(*) as "total_user" from users';
    return db.query(query);
};

export const updateOneUser = (id: string, body: IuserBody, hashedPassword: string): Promise<QueryResult<IdataUser>> => {
    let query = `UPDATE users SET `;
    let values = [];

    const { username, user_email, user_phone } = body;

    if (username?.length > 0) {
        query += `username = $${values.length + 1}, `;
        values.push(username);
    }

    if (user_email?.length > 0) {
        query += `user_email = $${values.length + 1}, `;
        values.push(user_email);
    }

    if (user_phone?.length > 0) {
        query += `user_phone = $${values.length + 1}, `;
        values.push(user_phone);
    }

    if (hashedPassword?.length > 0) {
        query += `user_pass = $${values.length + 1}, `;
        values.push(hashedPassword);
    }

    // Remove the trailing comma and space from the query string
    query = query.slice(0, -2);

    // Add WHERE clause to specify the user ID
    query += ` WHERE id = $${values.length + 1} returning username ,user_email ,user_phone`;
    values.push(id);

    return db.query(query, values);
};

export const deleteOneUser = (id: string): Promise<QueryResult<IdataUser>> => {
    const query = `update users set is_deleted = true
    where id = $1
    returning *`
    const values = [id]
    return db.query(query, values)
};

export const getPwdUser = (user_email: string): Promise<QueryResult<{ username: string; user_pass: string }>> => {
  const query = `select username, user_pass from users where user_email = $1`;
  const values = [user_email];
  return db.query(query, values);
};
  