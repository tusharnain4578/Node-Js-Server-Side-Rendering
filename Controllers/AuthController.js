const path = require("path");
const User = require("../Models/User");

class AuthController {
  //*********************
  //  Signup View | GET
  //**************
  signupView = (req, res) => {
    const sgError = req.flash("sgError");
    res.render("signup", { sgError: sgError.length > 0 ? sgError : null });
  };

  //********************
  //  Login View | GET
  //*************
  loginView = (req, res) => {
    const lgError = req.flash("lgError");
    res.render("login", { lgError: lgError.length > 0 ? lgError : null });
  };

  //********************
  //  Signup | POST
  //*************
  signupPost = async (req, res) => {
    for (const key in req.body) req.body[key] = req.body[key].trim();

    const { name, email, password, cpassword } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !cpassword ||
      name.length > 40 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      password.length < 8 ||
      password != cpassword
    ) {
      req.flash("data", { error: "Validation Failed!" });
      return res.redirect("/signup");
    }

    delete req.body.cpassword;

    let user = await User.findOne({ email });

    if (user) {
      req.flash("sgError", "Email already registered!");
      return res.redirect("/signup");
    }

    user = new User(req.body);

    await user.save();

    req.flash("data", { success: "Signup Successful!" });

    res.redirect("/login");
  };

  //********************
  //  Login | POST
  //*************
  loginPost = async (req, res) => {
    for (const key in req.body) req.body[key] = req.body[key].trim();

    const { email, password, keepLogin } = req.body;

    if (!email || !password || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      req.flash("data", { error: "Validation Failed!" });
      return res.redirect("/login");
    }

    const user = await User.findOne({ email });

    if (!user) {
      req.flash("lgError", "Email not registered!");
      return res.redirect("/login");
    }

    if (!(await user.verifyPassword(password))) {
      req.flash("lgError", "Wrong Password!");
      return res.redirect("/login");
    }

    req.session.userLoggedIn = true;
    req.session.user = user;

    if (keepLogin) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365;

    req.flash("lgSuccess", "You're Logged in!");
    res.redirect("/");
  };

  //********************
  //  Login Out | GET
  //*************
  logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
  };
}

const Auth = new AuthController();

module.exports = Auth;
