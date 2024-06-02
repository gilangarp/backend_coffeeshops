import { Idataproduct } from "./products";
import { IbasicResponse } from "./response";

export interface IimageProductBody {
    productIds: string;
    imgUrl: string;
}

export interface IdataImageProduct extends IimageProductBody , Idataproduct {
    id?: string,
    created_at?: string,
    updated_at?: string
}

export interface IdataImageProductResponse extends IbasicResponse {
    data?: IdataImageProduct[];
  }