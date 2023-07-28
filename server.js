const express = require("express");
const session = require("express-session");
require("./db");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const routes = require("./routes");
require("dotenv").config();

const app = express();

const sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(express.static("public", { maxAge: process.env.PUBLIC_CACHE ?? 0 }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: "auth_session",
    secret: process.env.SESSION_SECRET ?? "pirates",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { httpOnly: true },
  })
);
app.use(flash());

app.use((req, res, next) => {
  const flashData = req.flash("data");
  res.locals.flash = flashData[0];

  res.locals.user = req.session.user ? req.session.user : null;
  res.locals.currentUrl = req.url;
  next();
});

app.set("view engine", "ejs");
app.set("views", "./Views");

app.use(routes);
const port = process.env.PORT ?? 5000;

app.listen(port, () => console.log(`Server is up on port ${port}`));
