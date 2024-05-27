import { QueryResult } from "pg";
import db from "../configs/pg";
import { IdataStatusTransaction, IstatusTransactionBody } from "../models/statusTransaction";

export const createOneStatusTransaction = (body: IstatusTransactionBody): Promise<QueryResult<IdataStatusTransaction>> => {
    const query = `insert into status (status_mode)
    values ($1)
    returning * `
    const { status_mode } = body;
    const values = [ status_mode ];
    return db.query(query, values);
}

export const getAllStatusTransaction = (): Promise<QueryResult<IdataStatusTransaction>> => {
    const query = ` select * from status`
    return db.query(query);
};

export const upgradeOneStatusTransaction = (id: string , body: IstatusTransactionBody): Promise<QueryResult<IdataStatusTransaction>> => {
    const query = ` update status set status_mode = $2 where id = $1
    returning * `
    const { status_mode }  = body ;
    const values = [ id , status_mode ];
    return db.query( query , values );
};
