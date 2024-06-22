import { QueryResult } from "pg";
import db from "../configs/pg";
import { IdataProfile, IprofileBody } from "../models/profile";

export const createOneProfile = async (body: IprofileBody,imgUrl:string,UserId:string ): Promise<QueryResult<IdataProfile>> => {

    const query = `insert into profile (users_id , avatar , first_name , last_name , user_address )
    values ($1,$2,$3,$4,$5)
    returning users_id , avatar , first_name , last_name , user_address `;
    const { first_name, last_name, user_address } = body;
    const values: (string | number | null)[] = [ UserId ,imgUrl ? `/imgs/${imgUrl}` : null,first_name,last_name, user_address ];
    console.log(query,values,[UserId])    
    
    return db.query(query,values);
}



export const getAllProfile = (): Promise<QueryResult<IdataProfile>> => {
    const query = `select avatar , first_name , last_name , user_address 
        from profile `
    return db.query(query)
};

export const getOnelProfile = (id:string): Promise<QueryResult<IdataProfile>> => {
    const query = `select p.avatar , p.first_name , p.last_name  ,
        u.username ,u.user_phone , u.user_email , p.user_address , p.created_at , p.updated_at  
        from profile p 
        inner join users u on p.users_id  = u.id 
        where p.users_id  = $1`
    return db.query(query , [id])
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


export const checkIfProfileExists = async (id:string) => {
    const query = `SELECT COUNT(*) AS count FROM profile WHERE users_id = $1`;
    const Ischeck = await db.query(query, [id]);
    return Ischeck.rows[0].count > 0;
};

export const getNameUser = (username: string) => {
    const query = `SELECT id FROM users WHERE username = $1`;
    return db.query(query, [username]);
}