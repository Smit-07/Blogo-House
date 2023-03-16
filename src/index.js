const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const tsakRouter = require("./routers/task");
const app = express();

const port = 3000;

app.use(express.json());
app.use(userRouter);
app.use(tsakRouter);

app.listen(port, () => {
  console.log("Server is port on" + port);
});
