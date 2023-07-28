module.exports = (req, res, next) => {
  if (req.session.userLoggedIn && req.session.user) {
    return res.redirect("/");
  }

  next();
};
