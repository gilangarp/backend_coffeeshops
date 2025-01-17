import { IbasicResponse } from "./response";

export interface IcategoriesBody {
    categorie_name: string,
}

export interface IdataCategories extends IcategoriesBody {
    id: number,
    Ischeck:boolean,
    created_at: string,
    updated_at?: string
}

export interface IcategoriesResponse extends IbasicResponse {
    data?: IdataCategories[],
}
