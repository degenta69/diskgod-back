const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { chats } = require("./dummyData");

const connectToMongoDB = require("./config/db");

connectToMongoDB();

app = express();

app.use(express.json()); // for parsing application/json

app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
app.use('/api/user',userRoutes);

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 6453;



server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
