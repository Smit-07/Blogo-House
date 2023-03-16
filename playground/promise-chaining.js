require("../src/db/mongoose");

const User = require("../src/models/user.js");

// User.findByIdAndUpdate("640c6f804f460309e8074187", { age: 21 })
//   .then((result) => {
//     console.log(result);
//     return User.countDocuments({ age: 21 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("640d48f9cee1d848d0d754bf", 22)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
