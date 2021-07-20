// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const express = require("express")
const router = express.Router()
const restricted = require("./../auth/auth-middleware")
const Users = require("./users-model")

router.get("/api/users", restricted, (req, res, next) => {
  Users.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */


// Don't forget to add the router to the `exports` object so it can be required in other modules
