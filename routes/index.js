const router = require("express").Router();
const movieRouters = require("./movies");
const userRouters = require("./users");
const { validateUser, validateLogin } = require("../middlewares/validation");
const { createUser, login, logout } = require("../controllers/users");
const NotFoundError = require("../errors/NotFound");
const auth = require("../middlewares/auth");

router.post("/signup", validateUser, createUser);
router.post("/signin", validateLogin, login);

router.use(auth);

router.use("/users", userRouters);
router.use("/movies", movieRouters);
router.use("/signout", logout);

router.use("/*", (req, res, next) =>
  next(new NotFoundError("Страница не найдена"))
);

module.exports = router;
