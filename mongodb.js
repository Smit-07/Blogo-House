const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
const ObjectId = mongodb.ObjectId;
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("there is error");
    }
    const db = client.db(databaseName);
    // console.log("hello");
    // db.collection("users").insertOne(
    //   {
    //     name: "smit",
    //     age: "21",
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("there is error");
    //     }
    //     console.log(result.ops);
    //   }
    // );
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "nayan",
    //       age: "21",
    //     },
    //     {
    //       name: "meet",
    //       age: "21",
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("there is error");
    //     }
    //     console.log(result.ops);
    //   }
    // );
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Exercise",
    //       completed: true,
    //     },
    //     {
    //       description: "earn lots of money",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("there is error");
    //     }
    //     console.log(result.ops);
    //   }
    // );
    // db.collection("tasks").findOne(
    //   {
    //     _id: new ObjectId("640ad00db9568c4fecf1dd79"),
    //   },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("error");
    //     }
    //     console.log(user);
    //   }
    // );
    // db.collection("tasks")
    //   .find({ completed: true })
    //   .toArray((error, task) => {
    //     if (error) {
    //       return console.log("error");
    //     }
    //     console.log(task);
    //   });

    // db.collection("tasks")
    //   .updateOne(
    //     { _id: new ObjectId("640ad00db9568c4fecf1dd78") },
    //     {
    //       $set: {
    //         completed: false,
    //       },
    //     }
    //   )
    //   .then((task) => {
    //     console.log(task);
    //   })
    //   .catch((remove) => {
    //     console.log(remove);
    //   });
    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((task) => {
    //     console.log(task);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    db.collection("tasks")
      .deleteMany({ completed: true })
      .then((task) => console.log(task))
      .catch((error) => console.log(error));

    db.collection("users")
      .deleteOne({ name: "smit" })
      .then((task) => {
        console.log(task);
      })
      .catch((error) => console.log(error));
  }
);
