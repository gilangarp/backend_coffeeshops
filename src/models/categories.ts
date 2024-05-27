export interface IcategoriesBody {
    categorie_name: string,
}

export interface IdataCategories extends IcategoriesBody {
    id: number,
    created_at: string,
    updated_at?: string
}
