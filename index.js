const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");
require("dotenv").config();

const httpSercer = createServer(app);
const io = new Server(httpSercer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

require("./utils/io")(io);
httpSercer.listen(process.env.PORT, () => {
  console.log("Server listening on port", process.env.PORT);
});
