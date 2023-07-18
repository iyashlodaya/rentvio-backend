let express = require("express");
let router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
// const {} = require("../controllers/auth");

router.param("userId", getUserById);

// update route
router.put("/user/:userId", updateUser);



module.exports = router;
