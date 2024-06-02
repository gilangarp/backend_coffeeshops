import { QueryResult } from "pg";
import db from "../configs/pg";
import { IcategoriesBody, IdataCategories } from "../models/categories";

export const createOneCategories = (body: IcategoriesBody ): Promise<QueryResult<IdataCategories>> => {
    const query = `insert into categories (categorie_name)
    values ($1)
    returning categorie_name`;
    const { categorie_name } = body;
    const values = [categorie_name];
    return db.query(query,values);
}

export const getAllCategories = (): Promise<QueryResult<IdataCategories>> => {
    const query = `select categorie_name, created_at, updated_at from categories`
    return db.query(query)
}

export const updateOneCategories = (id: string, body: IcategoriesBody): Promise<QueryResult<IdataCategories>> => {
    const query = `update categories 
                   set categorie_name = $2
                   where id = $1 
                   RETURNING categorie_name, created_at, updated_at`;
    const { categorie_name } = body;
    const values = [id,categorie_name];
    return db.query(query, values);
};

export const checkIfCategoryExists = async (id:string) => {
    const query = `SELECT COUNT(*) AS count FROM categories WHERE id = $1`;
    const Ischeck = await db.query(query, [id]);
    return Ischeck.rows[0].count > 0;
};
