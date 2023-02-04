import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "./database";
import { IMovie, IMovieRequest, IPagination, MovieResult } from "./interfaces";

export const createMovie = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const movieDataRequest: IMovieRequest = request.body;

    const queryString: string = format(
        `
            INSERT INTO
                movies(%I)
            VALUES
                (%L)
            RETURNING *;
        `,
        Object.keys(movieDataRequest),
        Object.values(movieDataRequest)
    );

    const queryResult: MovieResult = await client.query(queryString);

    const newMovie: IMovie = queryResult.rows[0];

    return response.status(201).json(newMovie);
};

export const listMovie = async (
    request: Request,
    response: Response
): Promise<Response> => {
    let sort = request.query.sort;

    let order = request.query.order || "asc";

    let page = Number(request.query.page) || 1;

    let perPage = Number(request.query.perPage) || 5;

    let queryTemplate: string = "";

    if (sort === "price" && order === "asc") {
        queryTemplate = `
            SELECT
                *
            FROM
                movies
            ORDER BY price ASC
            OFFSET $1 LIMIT $2;
        `;
    } else if (sort === "duration" && order === "asc") {
        queryTemplate = `
            SELECT
                *
            FROM
                movies
            ORDER BY duration ASC
            OFFSET $1 LIMIT $2;
        `;
    } else if (sort === "price" && order === "desc") {
        queryTemplate = `
            SELECT
                *
            FROM
                movies
            ORDER BY duration DESC
            OFFSET $1 LIMIT $2;
        `;
    } else if (sort === "duration" && order === "desc") {
        queryTemplate = `
            SELECT
                *
            FROM
                movies
            ORDER BY duration DESC
            OFFSET $1 LIMIT $2;
        `;
    } else if (sort !== "price" && sort !== "duration") {
        queryTemplate = `
            SELECT
                *
            FROM
                movies
            ORDER BY id ASC
            OFFSET $1 LIMIT $2;
        `;
    }

    const queryConfig: QueryConfig = {
        text: queryTemplate,
        values: [perPage * (page - 1), perPage],
    };

    const queryResult: MovieResult = await client.query(queryConfig);

    const queryGetAllMovies = `
        SELECT
            *
        FROM
            movies;
    `;

    const queryGetAllMoviesResult: MovieResult = await client.query(
        queryGetAllMovies
    );

    const baseURL: string = `http://localhost:3000/movies/`;

    let previousPage: string | null = "";

    let nextPage: string | null = "";

    if (page === 1) {
        previousPage = null;
    } else {
        previousPage = `${baseURL}?page=${page - 1}&perPage${perPage}`;
    }

    if (
        Number(queryGetAllMoviesResult.rowCount) % perPage > 0 &&
        Number(queryGetAllMoviesResult.rowCount) / perPage > page
    ) {
        nextPage = `${baseURL}?page=${page + 1}&perPage${perPage}`;
    } else {
        nextPage = null;
    }

    const count: number = queryResult.rowCount;

    const pagination: IPagination = {
        previousPage,
        nextPage,
        count: count,
        data: queryResult.rows,
    };
    queryTemplate = "";
    return response.status(200).json(pagination);
};

// export const listMovie = async (
//     request: Request,
//     response: Response
// ): Promise<Response> => {
//     let page = Number(request.query.page) || 1;

//     let perPage = Number(request.query.perPage) || 5;

//     const queryTemplate: string = `
//         SELECT
//             *
//         FROM
//             movies
//         OFFSET $1 LIMIT $2;
//     `;

//     const queryConfig: QueryConfig = {
//         text: queryTemplate,
//         values: [perPage * (page - 1), perPage],
//     };

//     const queryResult: MovieResult = await client.query(queryConfig);

//     const queryGetAllMovies = `
//         SELECT
//             *
//         FROM
//             movies;
//     `;

//     const queryGetAllMoviesResult: MovieResult = await client.query(
//         queryGetAllMovies
//     );

//     const baseURL: string = `http://localhost:3000/movies/`;

//     let previousPage: string | null = "";

//     let nextPage: string | null = "";

//     if (page === 1) {
//         previousPage = null;
//     } else {
//         previousPage = `${baseURL}?page=${page - 1}&perPage${perPage}`;
//     }

//     if (
//         Number(queryGetAllMoviesResult.rowCount) % perPage > 0 &&
//         Number(queryGetAllMoviesResult.rowCount) / perPage > page
//     ) {
//         nextPage = `${baseURL}?page=${page + 1}&perPage${perPage}`;
//     } else {
//         nextPage = null;
//     }

//     const count: number = queryResult.rowCount;

//     const pagination: IPagination = {
//         previousPage,
//         nextPage,
//         count: count,
//         data: queryResult.rows,
//     };

//     return response.status(200).json(pagination);
// };

export const retrieveMovie = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const id = parseInt(request.params.id);

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

    return response.json(queryResult.rows[0]);
};

export const deleteMovie = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const id = parseInt(request.params.id);

    const queryString: string = `
    DELETE FROM
        movies
    WHERE
        id = $1;    
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult: MovieResult = await client.query(queryConfig);

    return response.status(204).send();
};

export const updateMovie = async (
    request: Request,
    response: Response
): Promise<Response> => {
    if (request.body.id) {
        return response.status(400).json({
            message: "Error updating id!",
        });
    }

    const id = parseInt(request.params.id);

    const movieData = Object.values(request.body);
    const movieKeys = Object.keys(request.body);

    const queryString: string = format(
        `
        UPDATE
            movies
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
    `,
        movieKeys,
        movieData
    );

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult: MovieResult = await client.query(queryConfig);

    return response.json(queryResult.rows[0]);
};
