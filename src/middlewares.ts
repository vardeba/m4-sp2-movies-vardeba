import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { MovieResult } from "./interfaces";

export const ensureMovieExists = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = parseInt(request.params.id);

    if (id / 1 !== id) {
        return response.status(400).json({
            message: "Invalid id!",
        });
    }

    const queryString: string = `
        SELECT
            *
        FROM
            movies
        WHERE
            id = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult: MovieResult = await client.query(queryConfig);

    if (!queryResult.rowCount) {
        return response.status(404).json({
            message: "Movie not found",
        });
    }

    return next();
};

export const ensureMovieNameDoesNotExists = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const queryString: string = `
        SELECT
            COUNT(*)
        FROM
            movies
        WHERE
            name = $1;    
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [request.body.name],
    };

    const queryResult: MovieResult = await client.query(queryConfig);

    if (Number(queryResult.rows[0].count) > 0) {
        return response.status(409).json({
            message: "There is already a movie with this name!",
        });
    }

    return next();
};

export const ensureBodyIsNotNull = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    if (!request.body) {
        return response.status(400).json({
            message: "Invalid body!",
        });
    }

    return next();
};
