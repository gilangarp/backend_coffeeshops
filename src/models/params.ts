import { IproductQuery } from "./products";
import { ItransactionQuery } from "./transactions";
import { IusersParams, IusersQuery } from "./users";
import { ParamsDictionary } from 'express-serve-static-core';

export type AppParams = ParamsDictionary | IusersParams;
export type QueryParams = IproductQuery | IusersQuery | ItransactionQuery;