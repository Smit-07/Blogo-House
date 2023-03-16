const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.send(e);
  }
  // task
  //   .save()
  //   .then((task) => {
  //     res.status(201).send(task);
  //   })
  //   .catch((error) => {
  //     res.send(error);
  //   });
});

router.get("/tasks", async (req, res) => {
  try {
    const task = await Task.find({});
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
  // Task.find({})
  //   .then((task) => {
  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

router.get("/task/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
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
});

router.patch("/task/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const UpdateAllow = ["description", "completed"];
  const isUpdateAllow = updates.every((update) => UpdateAllow.includes(update));

  if (!isUpdateAllow) {
    return res.status(404).send({ error: "Invalid Update!" });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!task) {
      return res.status(400).send();
    }
    res.send(task);
  } catch (e) {
    res.status(404).send();
  }
});

router.delete("/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
