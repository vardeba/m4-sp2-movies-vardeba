import express, { Application } from "express";
import { startDatabase } from "./database";
import {
    createMovie,
    deleteMovie,
    listMovie,
    retrieveMovie,
    updateMovie,
} from "./functions";
import {
    ensureBodyIsNotNull,
    ensureMovieExists,
    ensureMovieNameDoesNotExists,
} from "./middlewares";

const app: Application = express();

app.use(express.json());

app.post(
    "/movies",
    ensureBodyIsNotNull,
    ensureMovieNameDoesNotExists,
    createMovie
);

app.get("/movies", listMovie);

app.get("/movies/:id", ensureMovieExists, retrieveMovie);

app.delete("/movies/:id", ensureMovieExists, deleteMovie);

app.patch(
    "/movies/:id",
    ensureBodyIsNotNull,
    ensureMovieNameDoesNotExists,
    ensureMovieExists,
    updateMovie
);

app.listen(3000, async () => {
    await startDatabase();
    console.log("Server is running!");
});
