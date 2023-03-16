require("../src/db/mongoose");

const { count } = require("../src/models/task.js");
const Task = require("../src/models/task.js");

// Task.findByIdAndRemove("640d46df85ade84d487f884f")
//   .then((user) => {
//     console.log(user);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateIdAndRemove = async (id, completed) => {
  const user = await Task.findByIdAndRemove(id);
  const count = await Task.countDocuments({ completed });
  return count;
};

updateIdAndRemove("640c1050cd06dd03ccece474", false)
  .then((user) => {
    console.log(user);
  })
  .catch((e) => {
    console.log(e);
  });
