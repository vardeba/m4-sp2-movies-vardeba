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
    previousPage: string | null;
    nextPage: string | null;
    count: number;
    data: IMovie[] | null;
}

export type MovieResult = QueryResult<IMovie>;
