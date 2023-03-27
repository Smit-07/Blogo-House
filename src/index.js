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

// const User = require("./models/user");
// const Task = require("./models/task");

// const main = async () => {
//   // const task = await Task.findById("6415862e24b8682218fcbc6f");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById("641585d824b8682218fcbc6a");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
