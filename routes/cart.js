const express = require("express");

const router = express.Router();

const {
  getAllCartByUserId,
  getAllCart,
  createCart,
  deleteCart,
  getSingleProductFromCart,
  deleteAllCartByUserId,
  updateQuantityinCart
} = require("../controllers/cart");

router.route("/").get(getAllCart).post(createCart).put(updateQuantityinCart);;
// router.route("/cart").put(updateQuantityinCart);
router.route("/:userId").delete(deleteAllCartByUserId);
router.route("/:userId").get(getAllCartByUserId);
router.route("/:userId/:productId").get(getSingleProductFromCart).delete(deleteCart);

module.exports = router;