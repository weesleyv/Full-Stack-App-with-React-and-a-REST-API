const express = require("express");
const router = express.Router();
const User = require("../models").User;
const functions = require("./functions");

router.get(
  "/users",
  functions.authenticateUser,
  functions.asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      id: user.id
    });
  })
);

router.post(
  "/users",
  functions.asyncHandler(async (req, res) => {
    try {
      console.log(req.body);
        await User.create(req.body);
        res
          .status(201)
          .location("/")
          .end();
    } catch (error) {
      console.log( error );
      if (error.name === "SequelizeValidationError") {
        const errMsg = error.errors.map(err => err.message);
        res.status(400);
        res.json(errMsg);
      } else {
        throw error;
      }
    }
  })
);

module.exports = router;
