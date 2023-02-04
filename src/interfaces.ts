import { QueryResult } from "pg";

export interface IMovieRequest {
    name: string;
    description?: string | null;
    duration: number;
    price: number;
}

export interface IMovie extends IMovieRequest {
    id: number;
    count?: string;
}

export interface IPagination {
    previousPage: string;
    nextPage: string;
    count: number;
    data: any;
}

export type MovieResult = QueryResult<IMovie>;
