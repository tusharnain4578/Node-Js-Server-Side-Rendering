module.exports = (req, res, next) => {
  if (req.session.userLoggedIn && req.session.user) {
    return next();
  }

  req.flash("data", {
    error: "Authentication required to access home page!",
  });
  return res.redirect("/login");
};
