import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";

const app = express();

app.get("/", (request, response) => {
    return response.status(200).send("Server is Running");
})


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("mongoDB is now connected");

        app.listen(PORT, () => {
            console.log(`App Listening on ${PORT}`);
        });


    })
    .catch((error) => {
        console.log(error)
    })