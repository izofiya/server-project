const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const logger = require("./src/services/logger");
const service = express();

const port = process.env.PORT || 3030;

service.use(bodyParser.json())
service.use("/static", express.static(path.join(__dirname, "public")));
service.set("views", path.join(__dirname, "views"));
service.set("view engine", "pug");

service.get("/profile", (req, res) => {
  const person = {
    firstname: "Ivan",
    lastname: "Ivanov",
    tagline: "Developer",
    facebook: "https://www.facebook.com/",
    imgSrc: "personImg.png"
  };
  res.render("profile", {
    title: `About ${person.firstname} ${person.lastname}`,
    person,
  });
});

service.use("/", function (request, response) {
  response.send("Main page");
});

service.listen(port, () => {
  logger.info(`listening on ${port}`);
});
