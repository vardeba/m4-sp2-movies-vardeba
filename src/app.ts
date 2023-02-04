import express, { Application } from "express";
import { startDatabase } from "./database";
import {
    createMovie,
    deleteMovie,
    listMovie,
    retrieveMovie,
    updateMovie,
} from "./functions";
import { ensureMovieExists, ensureMovieNameDoesNotExist } from "./middlewares";

const app: Application = express();

app.use(express.json());

app.post("/movies", ensureMovieNameDoesNotExist, createMovie);

app.get("/movies", listMovie);

app.get("/movies/:id", ensureMovieExists, retrieveMovie);

app.delete("/movies/:id", ensureMovieExists, deleteMovie);

app.patch(
    "/movies/:id",
    ensureMovieNameDoesNotExist,
    ensureMovieExists,
    updateMovie
);

app.listen(3000, async () => {
    await startDatabase();
    console.log("Server is running!");
});
