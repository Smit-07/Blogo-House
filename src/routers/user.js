const User = require("../models/user");
const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const sharp = require("sharp");
const multer = require("multer");
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
  // user
  //   .save()
  //   .then((user) => {
  //     res.status(201).send(user);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/user/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).save();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);

  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (e) {
  //   res.send(e);
  // }

  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((e) => res.send(e));
});

// router.get("/user/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);

//     if (!user) {
//       res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }

//   // User.findById(_id)
//   //   .then((user) => {
//   //     if (!user) {
//   //       return res.status(404).send();
//   //     }
//   //     res.send(user);
//   //   })
//   //   .catch((e) => {
//   //     res.status(500).send();
//   //   });
// });

// router.patch("/user/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowUpdates = ["name", "email", "password", "age"];
//   const isUpdateAllow = updates.every((updates) =>
//     allowUpdates.includes(updates)
//   );

//   if (!isUpdateAllow) {
//     return res.status(404).send({ error: "invalid update!" });
//   }
//   try {
//     const user = await User.findById(req.params.id);

//     updates.forEach((update) => (user[update] = req.body[update]));

//     // console.log(updates);
//     // console.log(user);

//     await user.save();
//     // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     //   new: true,
//     //   runValidators: true,
//     // });

//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (e) {
//     res.send(e);
//   }
// });
router.patch("/user/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "email", "password", "age"];
  const isUpdateAllow = updates.every((updates) =>
    allowUpdates.includes(updates)
  );

  if (!isUpdateAllow) {
    return res.status(404).send({ error: "invalid update!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/user/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("please upload a jpg,jpeg or png document"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/user/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 250, width: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/user/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/user/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
