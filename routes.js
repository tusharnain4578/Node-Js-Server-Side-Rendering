const router = require("express").Router();
const authMiddleware = require("./Middlewares/auth");
const noAuthMiddleware = require("./Middlewares/noAuth");
const Auth = require("./Controllers/AuthController");
const Home = require("./Controllers/HomeController");

// --GET Routes-- //
router.get("/", authMiddleware, Home.homeView);
router.get("/about", authMiddleware, Home.aboutView);
router.get("/contact-us", authMiddleware, Home.contactUsView);

router.get("/signup", noAuthMiddleware, Auth.signupView);
router.get("/login", noAuthMiddleware, Auth.loginView);

router.get("/logout", authMiddleware, Auth.logout);

// --POST Routes-- //
router.post("/signup-post", noAuthMiddleware, Auth.signupPost);
router.post("/login-post", noAuthMiddleware, Auth.loginPost);

module.exports = router;
