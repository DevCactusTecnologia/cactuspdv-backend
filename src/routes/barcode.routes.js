const { Router } = require("express");
const {
  isLoggedIn,
  isAuthenticated,
  isSubscriptionActive,
  authorize,
} = require("../middlewares/auth.middleware");
const { SCOPES } = require("../config/user.config");
const { getBarcodes, updateBarcode } = require("../controllers/barcode.controller");

const router = Router();
const auth = [isLoggedIn, isAuthenticated, isSubscriptionActive];

router.get("/", ...auth, authorize([SCOPES.POS, SCOPES.SETTINGS]), getBarcodes);
router.patch("/:id", ...auth, authorize([SCOPES.SETTINGS]), updateBarcode);

module.exports = router;
