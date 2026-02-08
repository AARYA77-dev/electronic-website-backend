const express = require("express");

const router = express.Router();

const {
  getAllCartByUserId,
  getAllCart,
  createCart,
  deleteCart,
  getSingleProductFromCart
} = require("../controllers/cart");

router.route("/").get(getAllCart).post(createCart);

router.route("/:userId").get(getAllCartByUserId);
router.route("/:userId/:productId").get(getSingleProductFromCart).delete(deleteCart);

module.exports = router;