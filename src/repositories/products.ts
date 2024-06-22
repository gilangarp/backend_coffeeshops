import { Pool, PoolClient, QueryResult } from "pg"
import db from "../configs/pg"
import { Idataproduct, IproductBody, IproductQuery } from "../models/products";


export const createProduct = (body: IproductBody): Promise<QueryResult<Idataproduct>> => {
    const query = `insert into products (product_name , product_price , product_description , categories_id , product_stock)
    values ($1, $2, $3, $4, $5)
    returning product_name , product_price , product_description , categories_id , product_stock , created_at , uuid `;
    const { product_name,product_price,product_description,categories_id,product_stock } = body;
    const values = [ product_name,product_price,product_description,categories_id,product_stock ];
    console.log(query,values)
    return db.query(query, values);
};

export const createNewImageProduct = ( dbPool: Pool | PoolClient ,id: string , imgUrl?: string ): Promise<QueryResult<Idataproduct>> => {
    let query = `insert into image_product (img_product, product_id)
    values `;
    const values: (string | null)[] = [];
    const imgUrlValue = imgUrl ? `/imgs/${imgUrl}` : null ;
    query += ` ($${values.length + 1}, $${values.length + 2})`;
    values.push(imgUrlValue, id);
    query += ` returning img_product ,created_at `;
    console.log(query,values)

    return dbPool.query(query, values);
};

export const getAllProduct = async (queryParams:IproductQuery ): Promise<QueryResult<Idataproduct>> =>{
    let query = ` select products.uuid,
    products.product_name, products.product_price, image_product.img_product
    from products 
    inner join image_product on products.id = image_product.product_id
    inner join categories on products.categories_id = categories.id `;
    let value = [];
    let whereAdd = false;

    const {category, maximumPrice, minimumPrice, searchText, promo, sort ,page , limit} = queryParams;

    if (promo) {
        query += ` inner join promo on products.id = promo.product_id `;
    }

    if (searchText?.length > 0) {
        query += whereAdd ? ` and ` : ` where `;
        query += ` product_name ILIKE $${value?.length + 1} `
        value.push(`%${searchText}%`);
        whereAdd = true;
    }

    if (category) {
        query += whereAdd ? ` AND ` : ` WHERE `;
        let categoryFilter = '';
        if (category.toLowerCase() === 'drink') {
            categoryFilter = ` categorie_name = 'Drink' `;
        } else if (category.toLowerCase() === 'snack') {
            categoryFilter = ` categorie_name = 'Snack'`; 
        } else if (category.toLowerCase() === 'heavy meal') {
            categoryFilter = ` categorie_name = 'Heavy Meal'`; 
        } else {
            throw new Error('Category invalid options');
        };
        query += categoryFilter;
        whereAdd = true;
    }
    
    if (minimumPrice > 0 && maximumPrice > 0) {
        if (maximumPrice > minimumPrice) {
            query += whereAdd ? ` and ` : ` where `;
            query += ` product_price between $${value?.length + 1} and $${value?.length + 2}`
            value.push(minimumPrice);
            value.push(maximumPrice);
            whereAdd = true;
        }
    }

    if (sort) {
        let orderByClause = '';
        if (sort.toLowerCase() === 'cheaped') {
            orderByClause = ` ORDER BY product_price ASC`;
        } else if (sort.toLowerCase() === 'priciest') {
            orderByClause = ` ORDER BY product_price DESC`;
        } else if (sort.toLowerCase() === 'a-z') {
            orderByClause = ` ORDER BY product_name ASC`;
        } else if (sort.toLowerCase() === 'z-a') {
            orderByClause = ` ORDER BY product_name DESC`;
        } else if (sort.toLowerCase() === 'latest') {
            orderByClause = ` ORDER BY created_at ASC`;
        } else if (sort.toLowerCase() === 'longest') {
            orderByClause = ` ORDER BY created_at DESC`;
        } else {
            throw new Error('Sort invalid options');
        }
        query += orderByClause;
    } else {
        query += ' ORDER BY products.categories_id ASC';
    }
    

    if (page && limit) { 
        const pageLimit = parseInt(limit);
        const offset = (parseInt(page) - 1) * pageLimit;
        query += ` limit $${value.length + 1} offset $${value.length + 2}`
        value.push(pageLimit , offset);
    }

    return db.query( query , value )
};

export const getOneProduct = async (uuid: string ): Promise<QueryResult<Idataproduct>> =>{
    let query = `select
    p.product_name, p.product_price, p.product_description, p.product_stock,
    ip.img_product, c.categorie_name ,p.created_at, p.updated_at
    from products p 
    inner join image_product ip  on p.id = ip.product_id
    inner join categories c on p.categories_id = c.id 
    where p.uuid = $1 `;
    console.log(query)
    return db.query( query , [uuid]  )
};

export const getTotalProduct = (): Promise<QueryResult<{ total_product: string }>> => {
    let query = 'select count(*) as "total_product" from products';
    return db.query(query);
};

export const checkIfProductsExists = async (id:string) => {
    const query = `SELECT COUNT(*) AS count FROM products WHERE id = $1`;
    const Ischeck = await db.query(query, [id]);
    return Ischeck.rows[0].count > 0;
};

export const updateOneProduct = (id: string, body: IproductBody,imgUrl?: string): Promise<QueryResult<Idataproduct>> => {
    let query = ` `;
    let values = [];
    let hasUpdates = false;

    const { product_name, product_price, product_description, categories_id, product_stock } = body;

    if (product_name && product_name.length > 0) {
        query += `product_name = $${values.length + 1}, `;
        values.push(product_name);
        hasUpdates = true;
    }

    if (product_price && product_price > 0) {
        query += `product_price = $${values.length + 1}, `;
        values.push(product_price);
        hasUpdates = true;
    }

    if (product_description && product_description.length > 0) {
        query += `product_description = $${values.length + 1}, `;
        values.push(product_description);
        hasUpdates = true;
    }

    if (categories_id && categories_id > 0) {
        query += `categories_id = $${values.length + 1}, `;
        values.push(categories_id);
        hasUpdates = true;
    }

    if (product_stock !== undefined) {
        query += `product_stock = $${values.length + 1}, `;
        values.push(product_stock);
        hasUpdates = true;
    }

    if (hasUpdates) {
        query = `UPDATE products SET ${query.slice(0, -2)} WHERE id = $${values.length + 1} RETURNING 
        uuid , product_name , product_price , product_description , categories_id , product_stock , updated_at  ;`;
        values.push(id);
    } else {
        query = '';
    }

    if (imgUrl) {
        query += ` UPDATE image_product SET img_product = $${values.length + 1} WHERE product_id = $${values.length + 2} RETURNING img_product `;
        values.push(imgUrl ? `/imgs/${imgUrl}` : null, id);
    }

    console.log(imgUrl)

    return db.query(query, values);
};

export const deleteOneProduct = (id: string): Promise<QueryResult<Idataproduct>> => {
    const query = `update products set is_deleted = true
    where id = $1
    returning *`
    const values = [id]
    return db.query(query, values)
};


