import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";

const app = express();

app.use(express.json())

app.get("/", (request, response) => {
    return response.status(200).send("Server is Running");
})

app.post("/books", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400)
                .send({
                    message: "Send all required fields: title, author and publishYear",
                });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,

        };

        console.log("I will be waiting");

        const book = await Book.create(newBook);

        console.log("book has been added");
        
        return response.status(200).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }

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