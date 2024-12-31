import express from "express";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/channel.routes.js";
import channelRoutes from "./routes/message.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo ok");
});

app.use("/user", userRoutes);
app.use("/message", messageRoutes);
app.use("/channel", channelRoutes);

export default app;
