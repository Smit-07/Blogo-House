const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id: _id, owner: req.user._id });
    console.log(task);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/task/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const UpdateAllow = ["description", "completed"];
  const isUpdateAllow = updates.every((update) => UpdateAllow.includes(update));

  if (!isUpdateAllow) {
    return res.status(404).send({ error: "Invalid Update!" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(400).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    res.send(task);
  } catch (e) {
    res.status(404).send();
  }
});

router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    // const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

//-------post task--------
// const task = new Task(req.body);
// task
//   .save()
//   .then((task) => {
//     res.status(201).send(task);
//   })
//   .catch((error) => {
//     res.send(error);
//   });

//--------get task-------
// const task = await Task.find({ owner: req.user._id });

// Task.find({})
//   .then((task) => {
//     res.send(task);
//   })
//   .catch((e) => {
//     res.status(500).send();
//   });

//-----get task by id-----
// console.log(_id, req.user._id);

// Task.findById(_id)
//   .then((task) => {
//     if (!task) {
//       return res.status(404).send();
//     }
//     res.send(task);
//   })
//   .catch((e) => {
//     res.status(500).send();
//   });

//-------patch task by id----
// const task = await Task.findById(req.params.id);

// const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//   runValidators: true,
//   new: true,
// });
