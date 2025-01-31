import mongoose from "mongoose";
import appServer from "./app.js";
import {MONGO_URI, SERVER_PORT} from "./config/config.js";

// Mongoose
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
//.catch((err) => console.log("Occurred an error connecting to MongoDB", err));


// Server Rest
appServer.listen(SERVER_PORT, () => {
    console.log(`Server is running on port https://localhost:${SERVER_PORT}`);
    console.log(`socket io run on https://localhost:${SERVER_PORT}/socket`);
});
