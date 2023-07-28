const path = require("path");
const fs = require("fs");

class HomeController {
  homeView = (req, res) => {
    const lgSuccess = req.flash("lgSuccess");

    res.render("home", {
      name: req.session.user.name,
      email: req.session.user.email,
      lgSuccess: lgSuccess.length > 0 ? lgSuccess : null,
    });
  };

  aboutView = (req, res) => {
    res.render("about");
  };

  contactUsView = (req, res) => {
    res.render("contact_us");
  };
}

const Home = new HomeController();

module.exports = Home;
