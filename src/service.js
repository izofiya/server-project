const express = require("express");
const bodyParser = require("body-parser");

const logger = require("./services/logger");
const service = express();

const port = process.env.PORT || 3030;

service.set("view engine", "pug");

service.use(bodyParser.json())
service.use(express.static((__dirname, 'public')));

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
